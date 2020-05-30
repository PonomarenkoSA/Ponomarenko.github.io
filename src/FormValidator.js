'use strict';

class FormValidator {
    constructor(form) {
        this.form = form;
        this.errorText = {
            valueMissing: 'Это обязательное поле',
            tooShort: 'Должно быть от 2 до 30 символов'
          }
    }

    setEventListeners() {
        this.inputs = this.form.querySelectorAll('.popup__input');
        for(const input of this.inputs) {
            input.addEventListener('input', this.checkInputValidity.bind(this));
        }
        this.setSubmitButtonState();
    }

    checkInputValidity(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            const validityList = event.target.validity;
            const errorTextArray = Object.keys(this.errorText);
            errorTextArray.forEach((item) => {
                if (validityList[item] === true) {
                    event.target.nextElementSibling.textContent = this.errorText[item];
                }
            });
            event.target.nextElementSibling.classList.add('popup__error_is-opened');
        } else {
            event.target.nextElementSibling.classList.remove('popup__error_is-opened');
        };
        this.setSubmitButtonState();
    }

    setSubmitButtonState() {
        let flag = true;
        const submit = this.form.querySelector('.popup__button');
        this.inputs.forEach((input) => {
            if (!input.checkValidity()) {
              flag = false;
            }
        });
        if (!flag) {
            submit.classList.remove('popup__button_active');
            submit.setAttribute('disabled', '');;
        } else {
           submit.classList.add('popup__button_active');
           submit.removeAttribute('disabled');
        }
    }
}
