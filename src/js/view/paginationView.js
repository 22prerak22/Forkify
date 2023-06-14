import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  addHandlerRender(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      handler(+btn.dataset.goto);
    });
  }

  _genrateMarkup() {
    const curPage = this._data.page;
    const totalPage = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    // console.log(this._data);
    // first page and other pages
    if (curPage === 1 && totalPage > 1)
      return this._genrateNextButtonMarkup(curPage + 1);

    // last page
    if (curPage === totalPage && totalPage > 1)
      return this._genratePreviousButtonMarkup(curPage - 1);
    // some other page
    if (curPage < totalPage)
      return (
        this._genrateNextButtonMarkup(curPage + 1) +
        this._genratePreviousButtonMarkup(curPage - 1)
      );
    // only one page
    return '';
  }
  _genrateNextButtonMarkup(nextPage) {
    return ` 
    <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
        <span>Page ${nextPage}</span>
        <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-right"></use>
        </svg>
    </button>   
    `;
  }
  _genratePreviousButtonMarkup(lastPage) {
    return ` 
    <button data-goto="${lastPage}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${lastPage}</span>
    </button>
            `;
  }
}

export default new PaginationView();
