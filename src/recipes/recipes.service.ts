import { Injectable } from '@nestjs/common';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
  recipes: Recipe[] = [
    {
      id: '1',
      title: 'Sichuan Boiled Beef',
      description: 'Sichuan Cuisine',
      creationDate: new Date(),
      ingredients: ['Zanthoxylum', 'Beef'],
      forNumPeople: 6,
    },
    {
      id: '2',
      title: 'Teochew Beef Hotpot',
      description: 'Teochew Cuisine',
      creationDate: new Date(),
      ingredients: ['Mineral water', 'Beef'],
      forNumPeople: 4,
    },
  ];

  async findOneById(id: string): Promise<Recipe> {
    return this.recipes.filter((v) => v.id === id)[0];
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipes;
  }
}
