import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// polyfills for older browsers
import 'regenerator-runtime/runtime';
import 'core-js/stable';

// if (module.hot) {
//   module.hot.accept();
// }
//
const controllerRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // update results view
    resultsView.update(model.getSearchResultsPage());

    // storing and marking the selected bookmark results.
    bookmarksView.update(model.state.bookmarks);

    // 1) loading the recipe, it's a async function, not a pure function in module.js,
    await model.receiveRecipe(id);

    // 2) rendering recipe , passing view model of recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controllerSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // load the search results
    await model.loadSearchResults(query);

    // render search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // render the pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
controllerSearchResults();

// handler PAGINATION
const controllerPagination = function (goToPage) {
  // render NEW RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));
  //  render new Pag btns
  paginationView.render(model.state.search);
};

const controllerServings = function (newServings) {
  // update recipe servings (in state)
  model.updateServings(newServings);
  //  update the recipe view
  // recipeView.render(model.state.recipe);

  // Creating 'recipeView.update' to not redner all DOM , but the neccesarry nodes that changes , like in SPA's , only will render text and attributes , to not render entire view.
  recipeView.update(model.state.recipe);
};

// BOOKMARK
const controllerAddBookmark = function () {
  // Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  // Updating recipe view
  recipeView.update(model.state.recipe);
  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

// Bookmark handler function.
const controllerBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// User Recipes handler function
const controllerAddRecipe = function (newRec) {


  console.log(newRec);
};

// publisher-subscriber pattern
const init = function () {
  bookmarksView.addHandlerRender(controllerBookmarks);
  recipeView.addHandleRender(controllerRecipes);
  recipeView.addHandlerUpdateServings(controllerServings);
  recipeView.addHandlerAddBookmark(controllerAddBookmark);
  searchView.addHandlerSearch(controllerSearchResults);
  paginationView.addHandlerClick(controllerPagination);
  addRecipeView.addHandlerUpload(controllerAddRecipe);
};
init();
