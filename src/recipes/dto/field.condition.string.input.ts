import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FieldConditionStringInput {
  @Field(type => String, { nullable: true })
  eq?: string;

  @Field(type => String, { nullable: true })
  contains?: string;

}
