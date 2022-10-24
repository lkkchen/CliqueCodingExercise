import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class FieldConditionNumberInput {
  @Field(type => Int)
  eq: number;

  @Field(type => Int)
  gt: number;

  @Field(type => Int)
  gte: number;

  @Field(type => Int)
  lt: number;

  @Field(type => Int)
  lte: number;

}

