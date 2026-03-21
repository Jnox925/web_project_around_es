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

initialCards.forEach(function (card) {
  console.log(card.name);
});

//1.
const editButton = document.querySelector(".profile__edit-button");

//2.
const editPopup = document.querySelector("#edit-popup");

//3.
const closeButton = editPopup.querySelector(".popup__close");

//4.
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

//5.
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});


//6.
editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

//2-1.

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}
//2-2.
function fillProfileInfo() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

//2-3.
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

//3.

const editProfileForm = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function getCardElement({ name, link}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer);
});

const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");

const newCardForm = document.querySelector("#new-card-form");

const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

addCardButton.addEventListener("click", function () {
  newCardForm,.reset();
  enableValidation(newCardForm);
  openModal(newCardPopup);
});

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsConstainer);

  newCardForm.reset();

  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);


const enableValidation = (formElement) => {
  const inputlist = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  const showInputError = (inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__error_visible");
  };

  const hideInputError = (inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__error_visible")
  };

  const checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  };

  const toggleButtonState = () => {
    const (hasInvalidInput) = inputlist.some((input) => !input.validity.valid);

      if (hasInvalidInput) {
        buttonElement.classList.add("popup__button_disabled");
        buttonElement.description = true;
      } else {
        buttonElement.classList.remove("popup__button_disabled");
        buttonElement.disabled = false;
      }
  };

  inputlist.forEach((inputElement) => {
    inputElement.addEventListener("input",() => {
      checkInputValidity(inputElement);
      toggleButtonsState();
    });
  });
  toggleButtonState(); 
};

enableValidation(editProfileForm);
enableValidation(newCardForm);

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector("popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
      }
  }
};


