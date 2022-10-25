import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RecipesArgs } from './dto/recipes.args';

import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';

import {RecipeFieldStringCdInputFcg} from "./dto/recipe.field.string.cd.input.fcg"
import {RecipeFieldNumberCdInputFcg} from "./dto/recipe.field.number.cd.input.fcg"

@Resolver((of) => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => Recipe)
  async recipe(
    @Args('id') id: string,
    @Args({name: 'stringCondition', nullable: true}) stringCondition: RecipeFieldStringCdInputFcg,
    @Args({name: 'numberCondition', nullable: true}) numberCondition: RecipeFieldNumberCdInputFcg,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }


    recipe.fieldConditionResult = {
      stringConditionRes: checkFieldCondition(stringCondition, recipe),
      numberConditionRes: checkFieldCondition(numberCondition, recipe),
    };
    console.log(recipe);
    return recipe;
  }

  @Query((returns) => [Recipe])
  async recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }


}


function checkFieldCondition(fieldConditionDescObj, sourceData): any {

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

  const fieldConditionRes = {};
  for(const [field, conditionDescObj] of Object.entries(fieldConditionDescObj)){
    fieldConditionRes[field] = {};
    const nowSourceDataFieldValue = sourceData[field];
    for(const [operator, val] of Object.entries(conditionDescObj)){
      fieldConditionRes[field][operator] = null;

      if(operatorMap[operator]){
        const func = operatorMap[operator](val);
        fieldConditionRes[field][operator] = func(nowSourceDataFieldValue);
      }
    }
  }

  return fieldConditionRes;
}
