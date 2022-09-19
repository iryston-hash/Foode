import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for you request. Try another querys`;
  _successfulMessage = ``;

  _generateMarkupPreview(result) {
    // this is an array , we need to map it and join.
    return `
    <li class="preview">
      <a class="preview__link" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="image of a meal" />
        </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.source_url}</p>
      </div>
      </a>
    </li>
    `;
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
}
export default new ResultsView();
