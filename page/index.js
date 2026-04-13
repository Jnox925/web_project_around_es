import { Card } from "../components/card.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

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

// ---------------- USER INFO ----------------
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// ---------------- POPUP IMAGEN ----------------
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// ---------------- FUNCIÓN CREAR TARJETA ----------------
function createCard(item) {
  const card = new Card(item, "#card-template", (data) => {
    imagePopup.open(data);
  });

  return card.getCardElement();
}

// ---------------- SECTION ----------------
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

cardSection.renderItems();

// ---------------- POPUP EDITAR PERFIL ----------------
const editPopup = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    description: data.description,
  });

  editPopup.close();
});

editPopup.setEventListeners();

// ---------------- POPUP NUEVA TARJETA ----------------
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  const cardElement = createCard({
    name: data["place-name"],
    link: data.link,
  });

  cardSection.addItem(cardElement);
  newCardPopup.close();
});

newCardPopup.setEventListeners();

// ---------------- VALIDACIÓN ----------------
const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editValidator = new FormValidator(validationConfig, editForm);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

editValidator.setEventListener();
newCardValidator.setEventListener();

// ---------------- BOTONES ----------------
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();

    document.querySelector(".popup__input_type_name").value = userData.name;
    document.querySelector(".popup__input_type_description").value =
      userData.description;

    editPopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardPopup.open();
});
