class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clear();

    return query;
  }
  addHandlerRender(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
  _clear() {
    this._parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
