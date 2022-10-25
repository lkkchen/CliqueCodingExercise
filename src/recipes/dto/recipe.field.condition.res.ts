import { Field, ObjectType } from '@nestjs/graphql';

import { RecipeFieldStringCdResFcg } from './recipe.field.string.cd.res.fcg';
import { RecipeFieldNumberCdResFcg } from './recipe.field.number.cd.res.fcg';

@ObjectType({ description: 'RecipeFieldConditionRes' })
export class RecipeFieldConditionRes {

  @Field(type => RecipeFieldStringCdResFcg, { nullable: true })
  stringConditionRes?: RecipeFieldStringCdResFcg;

  @Field(type => RecipeFieldNumberCdResFcg, { nullable: true })
  numberConditionRes?: RecipeFieldNumberCdResFcg;

}


