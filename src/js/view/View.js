import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._genrateMarkup();
    if (!render) return markup;
    this._clear();
    // console.log(this);
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._genrateMarkup();

    // This will create new virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const oldElement = Array.from(this._parentEl.querySelectorAll('*'));

    newElement.forEach((newEl, i) => {
      const curEl = oldElement[i];
      // update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl?.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(curEl, '>>>>', curEl.textContent);
        curEl.textContent = newEl.textContent;
      }

      // update changed attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(x =>
          curEl.setAttribute(x.name, x.value)
        );
      }
    });
  }
  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
          <use href="${icons}#icon-loader"></use>
          </svg>
          </div>`;
    this._clear();
    this._parentEl?.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentEl?.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentEl?.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    if (this._parentEl !== '') this._parentEl.innerHTML = '';
  }
}
