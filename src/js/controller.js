import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
// polyfills for older browsers
import 'regenerator-runtime/runtime';
import 'core-js/stable';
//
const controllerRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) lading the recipe , async function , not a pure function in module
    await model.receiveRecipe(id);

    // 2) rendering recipe , passing view model of recipe
    recipeView.render(model.state.recipe);
  } 
  catch (err) {
    recipeView.renderError();
  }
};

const controllerSearchResults = async function() {
  try {
    const query = searchView.getQuery()
    if(!query) return 

    await model.loadSearchResults(query)
    console.log(model.state.search.results)
  } catch (err) {
    console.log(err)
  }
} 
controllerSearchResults()

// publisher-subscriber pattern
const init = function () {
  recipeView.addHandleRender(controllerRecipes);
  searchView.addHandlerSearch(controllerSearchResults)
};
init();
