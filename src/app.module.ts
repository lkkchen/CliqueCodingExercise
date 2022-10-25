import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { RecipesModule } from './recipes/recipes.module';
import { FcgModule } from './fcg/fcg.module';

@Module({
  imports: [
    RecipesModule,

    FcgModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
