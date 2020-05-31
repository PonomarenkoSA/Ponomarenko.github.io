'use strict';

import "./pages/style.css";
import {api} from './Api';
import Card from './Card';
import CardList from './CardList';
import FormValidator from './FormValidator';
import Popup from './Popup';
import UserInfo from './UserInfo';
import {avatar, userInfoJob, userInfoName, userButtonEdit, userButtonAdd, placesList, popupAddElement, popupEditElement, popupTemplate, formPlace, formEdit, inputName, inputJob} from './variables';

(function() {

const initialInformation = () => {
  return api.getInitialUserInformation()
}
const userInformation = new UserInfo('', '', initialInformation, userInfoJob, userInfoName, avatar);
const popupEdit = new Popup(popupEditElement);
const popupAdd = new Popup(popupAddElement);
const popupImage = new Popup(popupTemplate);
const openImage = () => {
  return popupImage.open();
}

userInformation.getInitialInfo();

// Добавил функцию, передающую в class Popup все элементы, на которые нужно установить слушатели
(function setPopupListeners () {
  const popups = document.querySelectorAll('.popup');
  for (const element of popups) {
    const popup = new Popup(element);
    popup.setEventListener();
  }
}) ();

// Функция создает массив готовых к вставке в DOM элементов стартовых карточек. 
//Для получения исходного массива (с сылками и названиями) используется метод класса api.
  api.getInitialCards()
        .then((data) => {
          const cardsArray = [];
          for (const element of data) {
            const card = new Card(element.name, element.link, popupTemplate, openImage);
            cardsArray.push(card.create());
          } 
          const cardList = new CardList(placesList, cardsArray);
          cardList.render()
        })
        .catch((err) => console.log(err));

// Функция убирает подписи ошибок валидации (применяется для очистки формы при повторном входе в нее)
function delErrorMessage (form) {
  const errorElements = form.querySelectorAll('span');
  errorElements.forEach((span) => {span.textContent = ''});
}

// Функция обработчик для открытия формы "Новые места"
function toOpenFormNewPlaces() {
  formPlace.reset();
  const formValidation = new FormValidator(formPlace);
  formValidation.setEventListeners();
  popupAdd.open();
  delErrorMessage(formPlace);
};

//Функция обработчик для открытия формы "Редактировать профиль" и заполнения полей сохраненными данными
function toOpenFormEdit() {
  inputName.value = userInformation.name;
  inputJob.value = userInformation.job;
  popupEdit.open();
  const formValidation = new FormValidator(formEdit);
  formValidation.setEventListeners(formEdit);
  delErrorMessage(formEdit);
};

// Функция обработчик для обновления информации о пользователе
//Для изменения информации о пользователе используется метод класса api.
function toUpdateUserInf(event) {
  event.preventDefault();
  api.toEditProfile(inputName.value, inputJob.value)
    .then((data) => {
      userInformation.setUserInfo(data.name, data.about);
      userInformation.updateUserInfo();
      popupEdit.close();
    })
    .catch((err) => console.log(err));
    
};

// Функция обработчик для добавления новой карточки в список
function toAddCard(event) {
  event.preventDefault();
  const name = event.target.closest('.popup__form').elements.name.value;
  const link = event.target.closest('.popup__form').elements.link.value;
  const card = new Card(name, link, popupTemplate, openImage);
  const cardList = new CardList(placesList, []);
  cardList.addCard(card.create());
  popupAdd.close();
};

// Слушатели

//Вешаем слушатель на кнопку открытия формы "Редактировать профиль"
userButtonEdit.addEventListener('click', toOpenFormEdit);

//Вешаем слушатель submit формы "Редактировать профиль"
formEdit.addEventListener('submit', toUpdateUserInf);

// Вешаем слушатель submit формы "Новые места"
formPlace.addEventListener('submit', toAddCard);

// Слушатели открытия формы "Новые места"
userButtonAdd.addEventListener('click', toOpenFormNewPlaces);


}) ();