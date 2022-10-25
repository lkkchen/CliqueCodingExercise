import { RecipeFieldConditionRes } from '../dto/recipe.field.condition.res'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {FieldCondition} from '../../fcg/field.condition.decorator'
import BaseModel from "../../fcg/base.model"

@ObjectType({ description: 'recipe' })
export class Recipe extends BaseModel{
  @Field((type) => ID)
  @FieldCondition("Recipe")
  id: string;

  @Field()
  @FieldCondition("Recipe")
  title: string;

  @Field({ nullable: true })
  @FieldCondition("Recipe")
  description?: string;

  @Field()
  @FieldCondition("Recipe")
  creationDate: Date;

  @Field((type) => [String])
  @FieldCondition("Recipe")
  ingredients: string[];

  @Field((type) => Int)
  @FieldCondition("Recipe")
  forNumPeople: number;


  @Field((type) => RecipeFieldConditionRes)
  fieldConditionResult?: RecipeFieldConditionRes;
}
