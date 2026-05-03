import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      this._handleSubmit();
    });
  }
}
