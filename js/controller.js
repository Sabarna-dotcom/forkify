import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from "./model.js";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

if(module.hot){
  module.hot.accept();
}

const controlRecipes = async function() {
  try{

    const id=window.location.hash.slice(1);
    if(!id) return;

    resultsView.update(model.getSearchResultsPage());

    recipeView.renderSpinner();

    await model.loadRecipe(id);
    
    recipeView.render(model.state.recipe);

    bookmarksView.update(model.state.bookmarks);

  }catch(err){
    console.log(err);
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try{

    const query = searchView.getQuery();

    if(!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search)

  } catch(err) {

    console.log(err);

  }
}

const controlPagination = function(goToPage) {
  console.log(goToPage);

  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search)

}

const controlServings = function (newServings) {

  model.updateServings(newServings);

  recipeView.update(model.state.recipe);

};

const controlAddBookmark = function () {
  if(!model.state.recipe.bookmarked) 
  {
    model.addBookmark(model.state.recipe)
  }
  else  
  {
    model.deleteBookmark(model.state.recipe.id)
  }
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const init=function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init()
