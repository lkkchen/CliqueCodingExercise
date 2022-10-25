import {readFileSync, writeFileSync} from "node:fs"
import { loadFiles } from './file.loader';
import {
  classDataFieldMap,
} from "./field.condition.metadata"

const targetModelDirPath = `./src/recipes/models`;
const targetDtoDirPath = `./src/recipes/dto`;


function loadModelFiles(){
  const fileList = loadFiles(targetModelDirPath);
  return fileList.filter((it)=>(it.name.indexOf(".fcg") === -1));
}


// 根据 model 生成
// xxx.field.number.cd.input.fcg
// xxx.field.string.cd.input.fcg
function createFieldInputFcgFiles(clsName, properties) {
  const types = [
    {bName: "String", sName: "string"},
    {bName: "Number", sName: "number"},
  ];

  for(const theType of types){

    const itemLines = [];
    for(const pk of properties){
      itemLines.push(`
  @Field((type) => FieldCondition${theType.bName}Input, { nullable: true })
  ${pk}?: FieldCondition${theType.bName}Input;
    `)
    }

    const fileContent = `
import { Field, InputType } from '@nestjs/graphql';
import {FieldCondition${theType.bName}Input} from "./field.condition.${theType.sName}.input"
@InputType({ description: '${clsName}Field${theType.bName}CdInputFcg' })
export class ${clsName}Field${theType.bName}CdInputFcg {
  ${itemLines.join("")}
}
  `;
    const fileName = `${clsName.toLowerCase()}.field.${theType.sName}.cd.input.fcg`;
    writeFileSync(`${targetDtoDirPath}/${fileName}.ts`, fileContent);


  }
}

// 根据 model 生成
// xxx.field.number.cd.res.fcg
// xxx.field.string.cd.res.fcg
function createFieldResFcgFiles(clsName, properties) {
  const types = [
    {bName: "String", sName: "string"},
    {bName: "Number", sName: "number"},
  ];

  for(const theType of types){

    const itemLines = [];
    for(const pk of properties){
      itemLines.push(`
  @Field((type) => FieldCondition${theType.bName}Res, { nullable: true })
  ${pk}?: FieldCondition${theType.bName}Res;
    `)
    }

    const fileContent = `
import { Field, InputType } from '@nestjs/graphql';
import {FieldCondition${theType.bName}Res} from "./field.condition.${theType.sName}.res"
@InputType({ description: '${clsName}Field${theType.bName}CdResFcg' })
export class ${clsName}Field${theType.bName}CdResFcg {
  ${itemLines.join("")}
}
  `;
    const fileName = `${clsName.toLowerCase()}.field.${theType.sName}.cd.res.fcg`;
    writeFileSync(`${targetDtoDirPath}/${fileName}.ts`, fileContent);


  }
}


// 根据 model 生成
// xxx.field.condition.res.fcg
function createResFcgFiles(clsName) {
  const content = `
import { Field, ObjectType } from '@nestjs/graphql';

import { ${clsName}FieldStringCdResFcg } from './${clsName.toLowerCase()}.field.string.cd.res.fcg';
import { ${clsName}FieldNumberCdResFcg } from './${clsName.toLowerCase()}.field.number.cd.res.fcg';

@ObjectType({ description: '${clsName}FieldConditionRes' })
export class ${clsName}FieldConditionRes {

  @Field(type => ${clsName}FieldStringCdResFcg, { nullable: true })
  stringConditionRes?: ${clsName}FieldStringCdResFcg;

  @Field(type => ${clsName}FieldNumberCdResFcg, { nullable: true })
  numberConditionRes?: ${clsName}FieldNumberCdResFcg;

}
  `;
  const fileName = `${clsName.toLowerCase()}.field.cd.res.fcg`;
  writeFileSync(`${targetDtoDirPath}/${fileName}.ts`, content);
}


function reWriteSourceModelFile(clsName) {
  const originFile = readFileSync(`${targetModelDirPath}/${clsName.toLowerCase()}.model.ts`);
  const fStrArr = originFile.toString().split("");

  let isMetLs = false;
  while (!isMetLs){
    const s = fStrArr.pop();
    if(s.indexOf("}") !== -1){
      isMetLs = true;
    }
  }

  // import { RecipeFieldCdResFcg } from '../dto/recipe.field.cd.res.fcg'
  const fdClassName = `${clsName}FieldCdResFcg`;

  let dpStr = fStrArr.join("");

  const headImportStr = `import { ${fdClassName} } from '${targetDtoDirPath}/${clsName.toLowerCase()}.field.cd.res.fcg'`;
  const lastDescStr1  = `@Field((type) => ${fdClassName})`;
  const lastDescStr2  = `fieldConditionResult?: ${fdClassName};`;

  dpStr = dpStr.replace(headImportStr, "");
  dpStr = dpStr.replace(lastDescStr1, "");
  dpStr = dpStr.replace(lastDescStr2, "");

  const dpStrArr = dpStr.split("");

  while (dpStrArr[0] === "\n"){
    dpStrArr.shift();
  }
  while (dpStrArr[dpStrArr.length-1] === "\n" || dpStrArr[dpStrArr.length-1] === "" || dpStrArr[dpStrArr.length-1] === " "){
    dpStrArr.pop();
  }

  dpStr = dpStrArr.join("");

  const finalFileStr = `${headImportStr}\n${dpStr}\n${lastDescStr1}\n${lastDescStr2};\n}`;
  writeFileSync(`${targetModelDirPath}/${clsName.toLowerCase()}.model.ts`, finalFileStr);
}


async function running(){
  const modelFiles = loadModelFiles();

  for(const file of modelFiles){
    await import(file.filePath);

  }

  console.log(classDataFieldMap);
  console.log(`generating model field condition class and rewriting...`);
  for(const [clsName, pks] of classDataFieldMap.entries()){
    createFieldInputFcgFiles(clsName, pks);
    createFieldResFcgFiles(clsName, pks);
    reWriteSourceModelFile(clsName);
  }
  console.log(`generate success, starting app...`);
}

running();
