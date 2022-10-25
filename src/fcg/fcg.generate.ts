import {readFileSync, writeFileSync} from "node:fs"
import { loadFiles } from './file.loader';
import {
  classDataFieldMap,
} from "./field.condition.metadata"

const targetModelDirPath = `./src/recipes/models`;


function loadModelFiles(){
  const fileList = loadFiles(targetModelDirPath);
  return fileList.filter((it)=>(it.name.indexOf(".fcg") === -1));
}



function reWriteSourceFile(clsName, properties) {
  const itemPks = [];
  for(const pk of properties){
    itemPks.push(`
  @Field((type) => Boolean)
  ${pk}: boolean;
    `)
  }

  const fdClassName = `${clsName}FieldConditionResult`;
  const template = `import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '${clsName}FieldConditionResult' })
export class ${fdClassName} {
  ${itemPks.join("\n")}
}
  `;

  const fieldConditionFileName = `${clsName.toLowerCase()}.fcg`;

  writeFileSync(`${targetModelDirPath}/${fieldConditionFileName}.ts`, template);

  const originFile = readFileSync(`./src/recipes/models/${clsName.toLowerCase()}.model.ts`);
  const fStrArr = originFile.toString().split("");
  // console.log(fStrArr);

  let isMetLs = false;
  while (!isMetLs){
    const s = fStrArr.pop();
    if(s.indexOf("}") !== -1){
      isMetLs = true;
    }
  }

  let dpStr = fStrArr.join("");

  const headImportStr = `import { ${fdClassName} } from './${fieldConditionFileName}'`;
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

  const findFileStr = `import { ${fdClassName} } from './${fieldConditionFileName}'\n${dpStr}\n
  @Field((type) => ${fdClassName})
  fieldConditionResult?: ${fdClassName};\n}`;
  writeFileSync(`${targetModelDirPath}/${clsName.toLowerCase()}.model.ts`, findFileStr);
}


async function running(){
  const modelFiles = loadModelFiles();

  for(const file of modelFiles){
    await import(file.filePath);

  }

  console.log(classDataFieldMap);
  console.log(`generating model field condition class and rewriting...`);
  for(const [clsName, pks] of classDataFieldMap.entries()){
    reWriteSourceFile(clsName, pks);
  }
  console.log(`generate success, starting app...`);
}

running();
