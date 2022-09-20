import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for you request. Try another querys`;
  _successfulMessage = ``;

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    // this is an array , we need to map it and join.
    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="image of a meal" />
        </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
      </a>
    </li>
    `;
  }
}
export default new ResultsView();
