import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for you request. Try another querys`;
  _successfulMessage = ``;

  _generateMarkup() {
    return this._data
    // returning a markup as a string with false par.
      .map(result => previewView.render(result, false))
      .join('');
  }
}
export default new ResultsView();
