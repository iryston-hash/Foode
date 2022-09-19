import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // ill be using event delegation ,as we have multiple buttons, so ill eventlistner to the parentElement
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // N.B.! 'closest' is like 'qs', but it searches up , rather than down the DOM tree
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPagination
    );
    console.log(numPages);
    // Page 1 , ...
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
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
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
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
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${currentPage - 1}</span>
        </button>

        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
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
