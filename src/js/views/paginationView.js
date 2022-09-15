import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPagination
    );
    console.log(numPages);
    // Page 1 , ...
    if (this._data.page === 1 && numPages > 1) {
      return `page 1, others`;
    }

    // last page
    if (this._data.page === numPages && numPages > 1) {
      return ` 
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page 1</span>
      </button>
      `;
    }
    // Other pages
    if (this._data.page < numPages) {
      return `other page`;
    }
    // Page 1 , others void
    return `only 1`;
  }
}
export default new PaginationView();

// <button class="btn--inline pagination__btn--next">
//   <span>Page 3</span>
//   <svg class="search__icon">
//     <use href="src/img/icons.svg#icon-arrow-right"></use>
//   </svg>
// </button>
