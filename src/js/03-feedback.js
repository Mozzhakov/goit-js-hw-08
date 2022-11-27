import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

let formData = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  formData = {};
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(e) {
  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    formData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  }
  formData[e.target.name] = e.target.value;
  const stringifiedFormData = JSON.stringify(formData);
  localStorage.setItem(LOCALSTORAGE_KEY, stringifiedFormData);
}

function showLocalStorageData() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (savedData) {
    input.value = savedData.email != undefined ? savedData.email : '';
    textarea.value = savedData.message != undefined ? savedData.message : '';
  }
}

showLocalStorageData();
