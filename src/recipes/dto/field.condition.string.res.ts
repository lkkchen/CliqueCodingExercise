import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'FieldConditionStringRes' })
export class FieldConditionStringRes {
  @Field(type => Boolean, { nullable: true })
  eq?: boolean;

  @Field(type => Boolean, { nullable: true })
  contains?: boolean;

}
