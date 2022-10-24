import { ObjectType , Field, InputType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class FieldConditionStringInput {
  @Field(type => String)
  eq: string;

  @Field(type => String)
  eq_nocase: string;

  @Field(type => String)
  contains: string;

  @Field(type => String)
  contains_nocase: string;

  @Field(type => String)
  starts_with: string;

  @Field(type => String)
  starts_with_nocase: string;

  @Field(type => String)
  ends_with: string;

  @Field(type => String)
  ends_with_nocase: string;
}
