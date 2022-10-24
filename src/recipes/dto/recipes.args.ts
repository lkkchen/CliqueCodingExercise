import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

import {FieldConditionStringInput} from "./field.condition.string.input"
import {FieldConditionNumberInput} from "./field.condition.number.input"

@ArgsType()
export class RecipesArgs {
  @Field(type => Int)
  @Min(0)
  skip = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field(type => FieldConditionStringInput)
  stringCondition? = {};

  @Field(type => FieldConditionNumberInput)
  numberCondition? = {};
}
