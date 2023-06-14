import { async } from 'regenerator-runtime';
import * as model from './model';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultsView from './view/resultsView';
import paginationView from './view/paginationView';
import bookmarksView from './view/bookmarksView';
import addNewRecipeView from './view/addNewRecipeView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async () => {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0): Updating the active search result
    resultsView.update(model.getSearchResultPage());

    // 0-1): Update the Bookmarks
    bookmarksView.update(model.state.bookMark);
    // 1): fetching the data
    await model.loadRecipe(id);
    // 2) Rendering the data
    recipeView.render(model.state.recipe);
    // console.log(model.state);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearch = async () => {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search result
    await model.loadSearch(query);
    // 3) Render search result
    resultsView.render(model.getSearchResultPage()); //
    // console.log(model.state);
    // 4) Render initial Pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(`error❤️❤️❤️${error}`);
  }
};
const controlPagination = page => {
  // 3) Render pagination result
  resultsView.render(model.getSearchResultPage(page));
  // 4) Render Pagination
  paginationView.render(model.state.search);
};

const controlServing = newServing => {
  model.updateServings(newServing);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = () => {
  // Add/Remove Bookmarks
  console.log(model.state.recipe);
  if (model.state.recipe.bookmarked)
    model.deleteBookMarck(model.state.recipe.id);
  else model.addBookMarck(model.state.recipe);
  // Render Bookmarks button
  recipeView.update(model.state.recipe);
  // Render Bookmarks View
  bookmarksView.render(model.state.bookMark);
};
const controlBookMark = () => {
  bookmarksView.render(model.state.bookMark);
};

const controlAddRecipe = async newRecipe => {
  try {
    addNewRecipeView.renderSpinner();
    // upload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //message window
    addNewRecipeView.renderMessage();
    //this timeout is for message window
    setTimeout(() => {
      addNewRecipeView.toggleWindow();
    }, 2000);
    // chnage id in the browser
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // render added recipe
    recipeView.render(model.state.recipe);
    //Render bookmark view
    bookmarksView.render(model.state.bookMark);
  } catch (error) {
    addNewRecipeView.renderError(error.message);
  }
};

const init = () => {
  addNewRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksView.addHandlerRender(controlBookMark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmarck(controlAddBookMark);
  searchView.addHandlerRender(controlSearch);
  paginationView.addHandlerRender(controlPagination);
};
init();
