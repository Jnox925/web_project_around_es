import { card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, setOverlayClose } from "./utils.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardsContainer = document.querySelector(".cards__list");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

setOverlayClose();

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getCardElement();
  cardsContainer.prepened(cardElement);
}

initialCards.forEach(renderCard);

const editValidator = new FormValidator(validationConfig, editProfileForm);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

editValidator.setEventListeners();
newCardValidator.setListeners();
