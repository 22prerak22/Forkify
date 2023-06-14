import View from './View';
import icons from 'url:../../img/icons.svg';
import { ERROR_MESSAGE3 } from '../config';
import previewView from './previewView';

class PreviewView extends View {
  _parentEl = '';

  _genrateMarkup() {
    console.log(this._data);
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${
      id === this._data.id ? 'preview__link--active' : ''
    } " href="#${this._data.id}">
      <figure class="preview__fig">
        <img src="${this._data.image}" alt="${this._data.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${this._data.title}</h4>
        <p class="preview__publisher ">${this._data.publisher}</p>
        <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
}
export default new PreviewView();
