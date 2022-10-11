import { async } from 'regenerator-runtime';
import { API_URL, RES_PAGINATION, API_KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

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

//  reusing recipe data
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    source: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,

    // using short curcuit trick , if a recipe key does exist it will display it , if not the expression will just be ignored.
    ...(recipe.key && { key: recipe.key }),
  };
};

// load recipe
export const receiveRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    state.recipe = createRecipeObject(data);
    // const { recipe } = data.data;
    // state.recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   source: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
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
const localStorageSetBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

//  BOOKMARKS
export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // marked bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  localStorageSetBookmarks();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // unmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  localStorageSetBookmarks();
};

const localStorageGetBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
localStorageGetBookmarks();

// upload user recipe
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      // entry[0] -> key , entry[1] -> value
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(`Wrong units or format, try again.`);

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);
    // console.log(Object.entries(newRecipe))
    // Object.entries turns obj into array

    // creating a recipe object
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.source,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe.cookingTime)
    // console.log(recipe.servings)
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
