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

// load recipe
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
    //  checking bookmarked state , ! this is an arrray, using 'some()'to check.
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
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

// localStorage the Bookmarks
const localStorageSetBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
} 

// BOOKMARKS
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  // marked bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  
  localStorageSetBookmarks()
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // unmarked 
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  
  localStorageSetBookmarks()
};

const localStorageGetBookmarks = function() {
  const storage =localStorage.getItem('bookmarks')
  if (storage) state.bookmarks = JSON.parse(storage)
} 
localStorageGetBookmarks()

