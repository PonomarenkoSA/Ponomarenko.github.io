'use strict';

// В качестве параметра передается элемент popup

class Popup {
    constructor(element) {
        this.element = element;
    }

    open() {
        this.element.classList.add('popup_is-opened');
    }

    close() {
        this.element.classList.remove('popup_is-opened');
    }

    setEventListener() {
        this.element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    }
}