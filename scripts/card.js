export class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._deletebutton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }

  getCardElement() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
