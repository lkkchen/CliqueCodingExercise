import { Field, InputType } from '@nestjs/graphql';

import {FieldConditionNumberInput} from "./field.condition.number.input"

@InputType({ description: 'RecipeFieldNumberCdInputFcg' })
export class RecipeFieldNumberCdInputFcg {

  @Field((type) => FieldConditionNumberInput, { nullable: true })
  id?: FieldConditionNumberInput;


  @Field((type) => FieldConditionNumberInput, { nullable: true })
  title?: FieldConditionNumberInput;


  @Field((type) => FieldConditionNumberInput, { nullable: true })
  description?: FieldConditionNumberInput;


  @Field((type) => FieldConditionNumberInput, { nullable: true })
  creationDate?: FieldConditionNumberInput;


  @Field((type) => FieldConditionNumberInput, { nullable: true })
  ingredients?: FieldConditionNumberInput;


  @Field((type) => FieldConditionNumberInput, { nullable: true })
  forNumPeople?: FieldConditionNumberInput;

}
