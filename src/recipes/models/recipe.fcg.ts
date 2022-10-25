import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'RecipeFieldConditionResult' })
export class RecipeFieldConditionResult {
  
  @Field((type) => Boolean)
  id: boolean;
    

  @Field((type) => Boolean)
  title: boolean;
    

  @Field((type) => Boolean)
  description: boolean;
    

  @Field((type) => Boolean)
  creationDate: boolean;
    

  @Field((type) => Boolean)
  ingredients: boolean;
    

  @Field((type) => Boolean)
  forNumPeople: boolean;
    
}
  