import { async } from 'regenerator-runtime';
import { API_KEY, API_URL } from './config.js';
// import { getJason, postJason } from './helpers.js';
import { AJAX } from './helpers.js';
import { RESULTSPERPAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultsPerPage: RESULTSPERPAGE,
  },
  bookMark: [],
};

const converToRecipeObj = data => {
  const { recipe } = data.data;
  state.recipe = {
    coockingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    //this will add the recipe.key only if it exist in our ibj
    ...(recipe.key && { key: recipe.key }),
  };
  console.log(state.recipe);
};

export const loadRecipe = async id => {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    converToRecipeObj(data);

    state.recipe.bookmarked = state.bookMark.some(
      bookmarck => bookmarck.id === id
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearch = async query => {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.query = query;
    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.result.slice(start, end);
};

export const updateServings = newServing => {
  console.log(state.recipe);
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

const updateLocalStorage = () => {
  localStorage.setItem('Bookmarks', JSON.stringify(state.bookMark));
};

export const addBookMarck = recipe => {
  // Add BookMarck
  state.bookMark.push(recipe);
  // Mark currnet recipe as bookmarck
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  updateLocalStorage();
};

export const deleteBookMarck = id => {
  console.log(id);
  // find index of the recipe which we want to remove
  const index = state.bookMark.findIndex(res => {
    console.log(res);
    return res.id === id;
  });
  // remove it from current bookmarck array
  debugger;
  state.bookMark.splice(index, 1);
  // set the state
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  updateLocalStorage();
};

const getBookmark = () => {
  const storage = localStorage.getItem('Bookmarks');
  if (storage) state.bookMark = JSON.parse(storage);
};
getBookmark();

export const uploadRecipe = async newRecipe => {
  try {
    console.log(newRecipe);
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(ing => ing.trim());
        if (ingArr.length !== 3)
          throw new Error('Please use right format to enter the data!!');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // console.log(ingredients);
    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      ingredients: ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    converToRecipeObj(data);
    addBookMarck(state.recipe);
  } catch (error) {
    throw error;
  }
};
