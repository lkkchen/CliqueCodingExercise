import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RecipesArgs } from './dto/recipes.args';

// import { FieldConditionNumberInput } from './dto/field.condition.number.input';
// import { FieldConditionStringInput } from './dto/field.condition.string.input';

import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';

@Resolver((of) => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query((returns) => [Recipe])
  async recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }


  // @Query((returns) => Object)
  // async fieldCondition(
  //   @Args() string: FieldConditionStringInput,
  //   @Args() number: FieldConditionNumberInput,
  // ): Promise<Object> {
  //
  //
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       test: false
  //     })
  //   })
  // }


}
