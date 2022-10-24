import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipeFieldConditionResult' })
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

@ObjectType({ description: 'recipe' })
export class Recipe {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field((type) => [String])
  ingredients: string[];

  @Field((type) => Int)
  forNumPeople: number;

  @Field((type) => RecipeFieldConditionResult)
  fieldConditionResult?: RecipeFieldConditionResult;
}
