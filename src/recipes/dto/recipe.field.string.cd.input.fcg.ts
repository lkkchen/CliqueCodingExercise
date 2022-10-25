
import { Field, InputType } from '@nestjs/graphql';
import {FieldConditionStringInput} from "./field.condition.string.input"

@InputType({ description: 'RecipeFieldStringCdInputFcg' })
export class RecipeFieldStringCdInputFcg {
  
  @Field((type) => FieldConditionStringInput, { nullable: true })
  id?: FieldConditionStringInput;
    
  @Field((type) => FieldConditionStringInput, { nullable: true })
  title?: FieldConditionStringInput;
    
  @Field((type) => FieldConditionStringInput, { nullable: true })
  description?: FieldConditionStringInput;
    
  @Field((type) => FieldConditionStringInput, { nullable: true })
  creationDate?: FieldConditionStringInput;
    
  @Field((type) => FieldConditionStringInput, { nullable: true })
  ingredients?: FieldConditionStringInput;
    
  @Field((type) => FieldConditionStringInput, { nullable: true })
  forNumPeople?: FieldConditionStringInput;
    
}
  