import View from './View';
import icons from 'url:../../img/icons.svg';
import { ERROR_MESSAGE3 } from '../config';
import previewView from './previewView';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = ERROR_MESSAGE3;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _genrateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
