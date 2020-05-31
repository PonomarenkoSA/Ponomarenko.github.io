'use strict';

export {avatar, userInfoJob, userInfoName, userButtonEdit, userButtonAdd, placesList, popupAddElement, popupEditElement, popupTemplate, formPlace, formEdit, inputName, inputJob};

const avatar = document.querySelector('.user-info__avatar');
const userInfoJob = document.querySelector('.user-info__job');
const userInfoName = document.querySelector('.user-info__name');  
const userButtonEdit = document.querySelector('.user-info__button-edit');  
const userButtonAdd = document.querySelector('.user-info__button');  
const placesList = document.querySelector('.places-list'); 
const popupAddElement = document.querySelector('.popup__add');
const popupEditElement = document.querySelector('.popup__edit');
const popupTemplate = document.querySelector('.popup__img');
const formPlace = document.querySelector('form[name=new]');
const formEdit = document.querySelector('form[name=edit]');
const inputName = document.querySelector('.popup__input_type_user');
const inputJob = document.querySelector('.popup__input_type_job');