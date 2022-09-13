import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
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

    resultsView.renderSpinner();
    recipeView.renderSpinner();

    // 1) lading the recipe , async function , not a pure function in module
    await model.receiveRecipe(id);

    // 2) rendering recipe , passing view model of recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllerSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    // render search results
    // resultsView.render(model.state.search.results);
    // search pages
    resultsView.render(model.getSearchResultsPage())
  } catch (err) {
    console.log(err);
  }
};
controllerSearchResults();

// publisher-subscriber pattern
const init = function () {
  recipeView.addHandleRender(controllerRecipes);
  searchView.addHandlerSearch(controllerSearchResults);
};
init();
