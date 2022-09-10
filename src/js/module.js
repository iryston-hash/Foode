export const state = {
  recipe: {},
};
export const receiveRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok)
      throw new Error(`${data.message} || RESPONSE STATUS -> ${res.status}`);
    console.log(data);
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
    console.log(state.recipe)
  }
  catch(err) {
    alert(err)
  }
};
