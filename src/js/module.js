import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// state contains all the data
export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
  }
};
export const receiveRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

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
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
// Search
export const loadSearchResults = async function (query) {
  try {
    state.search.query
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        title: rec.title,
        ingredients: rec.ingredients,
      };
    });
    console.log(state.search.results)
  } catch (err) {
    console.error(`${err} 💦💦💦💦`);
    throw err;
  }
};
