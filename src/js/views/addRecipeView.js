import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _successfulMessage = `Recipe uploaded`

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow()
  }
  
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    this._overlay.addEventListener('click', this.toggleWindow.bind(this))
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault()
      const dataArr = [...new FormData(this)]
      // Object.fromEntries -> converts array entries into the object , JS 2019
      const data = Object.fromEntries(dataArr)
      handler(data)
    })
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
