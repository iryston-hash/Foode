import * as model from './module.js';
import recipeView from './views/recipieView.js';
// polyfills for older browsers
import 'regenerator-runtime/runtime';
import 'core-js/stable';
//
const controllerRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // lading the recipe , async function , not a pure function in module
    await model.receiveRecipe(id);

    // rendering recipe , passing view model of recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
  }
};
// publisher-subscriber pattern
const init = function() {
  recipeView.addHandleRender(controllerRecipes)
}
init()