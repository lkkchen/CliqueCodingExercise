import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'FieldConditionNumberRes' })
export class FieldConditionNumberRes {
  @Field(type => Boolean, { nullable: true })
  eq?: boolean;

  @Field(type => Boolean, { nullable: true })
  gte?: boolean;

}
