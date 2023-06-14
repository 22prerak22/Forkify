import View from './View';
import icons from 'url:../../img/icons.svg';
import { ERROR_MESSAGE3 } from '../config';
import previewView from './previewView';

class AddNewRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _overlayEl = document.querySelector('.overlay');
  _windowEl = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe added sucessfully :)';
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._windowEl.classList.toggle('hidden');
    this._overlayEl.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', () => {
      this.toggleWindow();
    });
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', () => {
      this.toggleWindow();
    });
    this._overlayEl.addEventListener('click', () => {
      this.toggleWindow();
    });
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      // It provides a way to easily construct a set of key/value pairs representing form fields and thier values,
      const data = [...new FormData(this._parentEl)];
      //FromEntries will create a object from key value pair array
      const recipe = Object.fromEntries(data);
      handler(recipe);
    });
  }

  _genrateMarkup() {}
}
export default new AddNewRecipeView();
