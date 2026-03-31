import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, setOverlayClose } from "./utils.js";

// ---------------- DATOS INICIALES ----------------
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// ---------------- CONFIG VALIDACIÓN ----------------
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ---------------- DOM ----------------
const cardsContainer = document.querySelector(".cards__list");

// Popups
const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");

// Botones
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Formularios
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

// Inputs perfil
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);

// Inputs nueva tarjeta
const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

// ---------------- FUNCIONES ----------------

// Render tarjeta
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getCardElement();
  cardsContainer.prepend(cardElement);
}

// Llenar formulario perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Abrir popup perfil
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

// Submit perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

// Submit nueva tarjeta
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });

  newCardForm.reset();
  closeModal(newCardPopup);
}

// ---------------- EVENTOS ----------------

// Abrir popups
editButton.addEventListener("click", handleOpenEditModal);

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  openModal(newCardPopup);
});

// Cerrar popups
editPopup
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(editPopup));
newCardPopup
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(newCardPopup));

// Submit
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Overlay + ESC
setOverlayClose();

// ---------------- INICIALIZACIÓN ----------------

// Render inicial
initialCards.forEach(renderCard);

// Validación
const editValidator = new FormValidator(validationConfig, editProfileForm);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

editValidator.setEventListener();
newCardValidator.setEventListener();
