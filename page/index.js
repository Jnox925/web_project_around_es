import { Card } from "../components/card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

// ---------------- API ----------------

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "31ffbe40-7da5-4009-8539-fa7d9d01d553",
    "Content-Type": "application/json",
  },
});

let cardSection;
let userId;

// ---------------- USER ----------------

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// ---------------- POPUPS ----------------

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation("#delete-popup");
deletePopup.setEventListeners();

// ---------------- CREAR TARJETA ----------------

function createCard(item) {
  const card = new Card(
    item,
    "#card-template",

    (data) => imagePopup.open(data),

    // DELETE
    (cardId, cardElement) => {
      deletePopup.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            deletePopup.close();
          })
          .catch(console.error);
      });

      deletePopup.open();
    },

    // LIKE HANDLER
    (cardInstance) => {
      const isLiked = cardInstance.isLiked();

      const request = isLiked
        ? api.unlikeCard(cardInstance.getId())
        : api.likeCard(cardInstance.getId());

      request
        .then((updatedCard) => {
          cardInstance.updateLikes(updatedCard);
        })
        .catch(console.error);
    },

    userId,
  );

  return card.getCardElement();
}

// ---------------- CARGA INICIAL ----------------

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    document.querySelector(".profile__image").src = userData.avatar;

    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = createCard(item);
          cardSection.addItem(card);
        },
      },
      ".cards__list",
    );

    cardSection.renderItems();
  })
  .catch(console.error);

// ---------------- NUEVA TARJETA ----------------

const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  newCardPopup.setLoading(true, "Crear");

  api
    .addCard({
      name: data["place-name"],
      link: data.link,
    })
    .then((card) => {
      cardSection.addItem(createCard(card));
      newCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      newCardPopup.setLoading(false, "Crear");
    });
});

newCardPopup.setEventListeners();
// ---------------- EDITAR PERFIL ----------------

const editPopup = new PopupWithForm("#edit-popup", (data) => {
  api
    .updateUserInfo({
      name: data.name,
      about: data.description,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
      });
      editPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editPopup.setLoading(false);
    });
});

editPopup.setEventListeners();

// ---------------- BOTONES ----------------

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardPopup.open();
});

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();

    document.querySelector(".popup__input_type_name").value = userData.name;
    document.querySelector(".popup__input_type_description").value =
      userData.description;

    editPopup.open();
  });

const avatarPopup = new PopupWithForm("#avatar-popup", (data) => {
  avatarPopup.setLoading(true);

  api
    .updateAvatar(data.avatar)
    .then((userData) => {
      document.querySelector(".profile__image").src = userData.avatar;
      avatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarPopup.setLoading(false);
    });
});

document
  .querySelector(".profile__image-container")
  .addEventListener("click", () => {
    avatarPopup.open();
  });
