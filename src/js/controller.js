import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
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

// handler
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
  recipeView.update(model.state.recipe)
};

// publisher-subscriber pattern
const init = function () {
  recipeView.addHandleRender(controllerRecipes);
  recipeView.addHandlerUpdateServings(controllerServings)
  searchView.addHandlerSearch(controllerSearchResults);
  paginationView.addHandlerClick(controllerPagination);
};
init();
