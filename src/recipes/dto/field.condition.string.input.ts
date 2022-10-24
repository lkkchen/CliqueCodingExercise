import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FieldConditionStringInput {
  @Field({ nullable: true })
  @Field(type => String)
  eq?: string;

  @Field({ nullable: true })
  @Field(type => String)
  contains?: string;

}
