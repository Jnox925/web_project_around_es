export class FormValidator {
  contructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector),
    );
    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector,
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`,
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`,
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElemnt);
    } else {
      this._hideInputElement(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validiti.valid,
    );

    if (hasInvalidInput) {
      this._buttonElement.disable = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListener() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        (this._checkInputValidity(inputElement), this._toggleButtonState());
      });
    });

    this._toggleButtonState();
  }

  setEventListener() {
    this._setEventListener();
  }
}
