import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FieldConditionNumberInput {

  @Field({ nullable: true })
  @Field(type => Int)
  eq?: number;

  @Field({ nullable: true })
  @Field(type => Int)
  gte?: number;

}
