export class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner?._id || data.owner;
    this._likes = data.likes || [];
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return template;
  }

  getCardElement() {
    // crear elemento
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._titleElement = this._element.querySelector(".card__title");

    // contenido
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    // ocultar botón si no es dueño
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    // evento imagen
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });

    // evento delete (IMPORTANTE)
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id, this._element);
      });
    }

    // like
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeCount = this._element.querySelector(".card__like-count");

    // estado inicial
    this.updateLikes({ likes: this._likes });

    // evento like
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    return this._element;
  }

  isLiked() {
    return (this._likes || []).some(
      (user) => (user._id || user) === this._userId,
    );
  }

  getId() {
    return this._id;
  }

  updateLikes(data) {
    const liked = data.isLiked;

    // contador (si existe)
    if (this._likeCount) {
      let count = parseInt(this._likeCount.textContent) || 0;

      if (liked) {
        count += 1;
      } else {
        count = Math.max(0, count - 1);
      }

      this._likeCount.textContent = count;
    }

    // estado visual
    if (liked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }
}
