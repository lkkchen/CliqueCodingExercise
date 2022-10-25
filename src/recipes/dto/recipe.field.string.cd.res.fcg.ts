import { Field, ObjectType } from '@nestjs/graphql';

import {FieldConditionStringRes} from "./field.condition.string.res"

@ObjectType({ description: 'RecipeFieldStringCdResFcg' })
export class RecipeFieldStringCdResFcg {
  @Field(type => FieldConditionStringRes, { nullable: true })
  id: FieldConditionStringRes;


  @Field(type => FieldConditionStringRes, { nullable: true })
  title: FieldConditionStringRes;


  @Field(type => FieldConditionStringRes, { nullable: true })
  description: FieldConditionStringRes;


  @Field(type => FieldConditionStringRes, { nullable: true })
  creationDate: FieldConditionStringRes;


  @Field(type => FieldConditionStringRes, { nullable: true })
  ingredients: FieldConditionStringRes;


  @Field(type => FieldConditionStringRes, { nullable: true })
  forNumPeople: FieldConditionStringRes;
}

