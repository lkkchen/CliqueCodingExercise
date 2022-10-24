import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RecipesArgs } from './dto/recipes.args';

import { Recipe, RecipeFieldConditionResult } from './models/recipe.model';
import { RecipesService } from './recipes.service';

import {FieldConditionStringInput} from "./dto/field.condition.string.input"
import {FieldConditionNumberInput} from "./dto/field.condition.number.input"

@Resolver((of) => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => Recipe)
  async recipe(
    @Args('id') id: string,
    @Args('stringCondition') stringCondition: FieldConditionStringInput,
    @Args('numberCondition') numberCondition: FieldConditionNumberInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }

    const finalCondition = {
      ...stringCondition,
      ...numberCondition,
    };

    recipe.fieldConditionResult = checkFieldCondition(finalCondition, recipe);
    console.log(recipe);
    return recipe;
  }

  @Query((returns) => [Recipe])
  async recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }


}


function checkFieldCondition(strCondition, sourceData): RecipeFieldConditionResult {
  const operatorMap = {
    eq: (param) => {
      return function(target) {
        return param === target;
      }
    },

    gte: (param) => {
      return function(target) {
        if(typeof target !== 'number') {
          return false;
        }
        return target >= param;
      }
    },

    contains: (param) => {
      return function(target) {
        if(typeof target !== 'string') {
          return false;
        }
        return target.indexOf(param) !== -1;
      }
    },

  };

  function genCheckFuncList(hasGiveCondition) {
    const res = [];
    if(!hasGiveCondition) return res;
    const giveCdKeys = Object.keys(hasGiveCondition);
    if(giveCdKeys.length){
      for(const opKey of giveCdKeys){
        if(!operatorMap[opKey]){
          continue;
        }

        res.push( operatorMap[opKey](hasGiveCondition[opKey]) );
      }
    }
    return res;
  }

  const checkFuncList = genCheckFuncList(strCondition);
  function runCheckField(fieldValue) {
    for(const func of checkFuncList){
      if(func(fieldValue)){
        return true;
      }
    }
    return false;
  }

  const fieldConditionResult = new RecipeFieldConditionResult;
  for(const [field, value] of Object.entries(sourceData)){
    fieldConditionResult[field] = runCheckField(value);
  }
  return fieldConditionResult;
}
