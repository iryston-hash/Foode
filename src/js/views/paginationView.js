import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPagination
    );
    console.log(numPages);
    // Page 1 , ...
    if (currentPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next">
          <span>${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return ` 
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${currentPage - 1}</span>
        </button>
      `;
    }
    // Other pages
    if (currentPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${currentPage - 1}</span>
        </button>

        <button class="btn--inline pagination__btn--next">
          <span>${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // Page 1 , others void
    return ``;
  }
}
export default new PaginationView();
