import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FieldConditionNumberInput {
  @Field(type => Int, { nullable: true })
  eq?: number;

  @Field(type => Int, { nullable: true })
  gte?: number;

}
