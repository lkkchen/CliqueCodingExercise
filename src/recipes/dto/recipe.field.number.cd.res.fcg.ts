
import { Field, ObjectType } from '@nestjs/graphql';
import {FieldConditionNumberRes} from "./field.condition.number.res"

@ObjectType({ description: 'RecipeFieldNumberCdResFcg' })
export class RecipeFieldNumberCdResFcg {
  
  @Field((type) => FieldConditionNumberRes, { nullable: true })
  id?: FieldConditionNumberRes;
    
  @Field((type) => FieldConditionNumberRes, { nullable: true })
  title?: FieldConditionNumberRes;
    
  @Field((type) => FieldConditionNumberRes, { nullable: true })
  description?: FieldConditionNumberRes;
    
  @Field((type) => FieldConditionNumberRes, { nullable: true })
  creationDate?: FieldConditionNumberRes;
    
  @Field((type) => FieldConditionNumberRes, { nullable: true })
  ingredients?: FieldConditionNumberRes;
    
  @Field((type) => FieldConditionNumberRes, { nullable: true })
  forNumPeople?: FieldConditionNumberRes;
    
}
  