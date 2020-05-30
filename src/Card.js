'use strict';

// В качестве параметров передается название, ссылка, элемент для вставки Popup и экземпляр метода.

class Card {
    constructor(title, link, popupTemplate, openImage) {
        this.title = title;
        this.link = link;
        this.popupTemplate = popupTemplate;
        this.openImage = openImage;
        this.cardItem = '';
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.openImagePopup = this.openImagePopup.bind(this);
    }

    like (event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.delEventListener();
        this.cardItem.remove();
    }

    create(){
        const card = document.createElement('div');
        card.classList.add('place-card');
        const template = ` 
            <div class="place-card__image" style="background-image: url(${this.link})"> 
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name">${this.title}</h3>
                <button class="place-card__like-icon"></button>
            </div>`;
        card.insertAdjacentHTML('beforeend', template);
        this.cardItem = card;
        this.setEventListener();
        return card
    }

    setEventListener() {
        this.cardItem.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.cardItem.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        this.cardItem.querySelector('.place-card__image').addEventListener('click', this.openImagePopup);
    }

    delEventListener() {
        this.cardItem.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        this.cardItem.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
        this.cardItem.querySelector('.place-card__image').removeEventListener('click', this.openImagePopup);
    }

    openImagePopup() {
        this.popupTemplate.querySelector('.popup__image').setAttribute('src', this.link);
        this.openImage();
    }
}
