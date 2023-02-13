import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//from parcel
// if(module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;
    //render spinner
    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch(err) {
    console.log(err);
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await model.loadSearchResults(query);

    //render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //render initital pagination buttons
    paginationView.render(model.state.search)
  } catch(err) {
    console.log(err);
  }
}

const controlPagination = function(goToPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render new  pagination buttons
  paginationView.render(model.state.search)
}
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();