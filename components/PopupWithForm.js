import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit.button");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      console.log("SUBMIT EDITANDO PERFIL", this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  setLoading(isLoading, defaultText = "guardar") {
    if (this._submitButton) {
      this._submitbutton.textContent = isLoading ? "Guardando..." : defaultText;
    }
  }
}
