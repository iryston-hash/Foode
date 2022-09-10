import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON} from './helpers.js'

export const state = {
  recipe: {},
};
export const receiveRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`)
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      image: recipe.image_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      source: recipe.source_url,
    };
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
