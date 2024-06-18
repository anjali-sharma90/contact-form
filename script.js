'use strict';

import { validateInput } from './helpers.js';

const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const submitBtnElm = document.querySelector('.contact-form__submit');
const firstNameElm = document.querySelector('.first-name');
const lastNameElm = document.querySelector('.last-name');
const emailElm = document.querySelector('.email');
const generalRadioElm = document.querySelector('.general');
const requestRadioElm = document.querySelector('.request');
const messageElm = document.querySelector('.message');
const consentElm = document.querySelector('.custom-checkbox');
const successMsgElm = document.querySelector('.contact-form__success');
const formElm = document.querySelector('.contact-form__form');
const errorMsgElm = document.querySelectorAll('.error-message');
const inputBoxes = document.querySelectorAll('.input-box');

const resetErrorStyles = () => {
  errorMsgElm.forEach(msgEl => msgEl.classList.remove('error-message--show'));
  inputBoxes.forEach(inputBox => inputBox.classList.remove('error'));
};

const showErrorMessages = inputs => {
  resetErrorStyles();
  inputs.forEach(input => {
    input
      .closest('.contact-form__input')
      .querySelector('.error-message')
      .classList.add('error-message--show');
    input.classList.add('error');
  });
};

const showSuccessMessage = () => {
  resetErrorStyles();
  successMsgElm.classList.add('contact-form__success--show');
  setTimeout(() => {
    successMsgElm.classList.remove('contact-form__success--show');
  }, 3000);
  formElm.reset();
  document.body.scrollTop = 0;
};

const submitHandler = () => {
  const formFields = {
    firstName: {
      elm: firstNameElm,
      check: !!firstNameElm.value,
    },
    lastName: {
      elm: lastNameElm,
      check: !!lastNameElm.value,
    },
    email: {
      elm: emailElm,
      check: validateInput(emailElm.value, mailRegex),
    },
    radios: {
      elm: generalRadioElm,
      check: generalRadioElm.checked || requestRadioElm.checked,
    },
    message: {
      elm: messageElm,
      check: !!messageElm.value,
    },
    consent: {
      elm: consentElm,
      check: consentElm.checked,
    },
  };

  const inputsArr = Object.entries(formFields);
  const invalidInputs = inputsArr
    .filter(el => !el[1].check)
    .map(el => el[1].elm);

  const areAllInputsValid = inputsArr.every(el => el[1].check);
  areAllInputsValid ? showSuccessMessage() : showErrorMessages(invalidInputs);
};

submitBtnElm.addEventListener('click', submitHandler);
