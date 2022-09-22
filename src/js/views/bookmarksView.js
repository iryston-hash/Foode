import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No Bookmarks`;
  _successfulMessage = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler)
  }
  _generateMarkup() {
    return this._data
    // returning a markup as a string with false par.
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
