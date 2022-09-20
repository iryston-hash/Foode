import { API_URL, RES_PAGINATION } from './config.js';
import { getJSON } from './helpers.js';

// state contains all the data
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPagination: RES_PAGINATION,
  },
  bookmarks: [],
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
      publisher: recipe.publisher,
    };
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
// Search
export const loadSearchResults = async function (query) {
  try {
    state.search.query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
      };
    });
    // whenever the new search page init. , the search results section of pagination restarts to the first page.
    state.search.page = 1;

  } catch (err) {
    console.error(`${err} 💦💦💦💦`);
    throw err;
  }
};

// pagination
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPagination; // 0;
  const end = page * state.search.resultsPagination; // 9

  return state.search.results.slice(start, end);
};

// updateServings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

// Bookmarks
export const addBookmark = function(recipe) {
  state.bookmarks.push(recipe)

  // marked bookmark
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true
} 