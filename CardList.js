'use strict';

// В качестве параметров передается контейнер для вставки готовых карточек, а также массив с готовыми карточками - элементами первоначальных изображений

class CardList {
    constructor(container, cardsArray) {
        this.container = container;
        this.cardsArray = cardsArray;
    }

    addCard(card) {   
        this.container.appendChild(card);
    }

    render() {
        for (const element of this.cardsArray) {
            this.container.appendChild(element);
        }
    }
}