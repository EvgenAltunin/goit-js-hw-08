import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    formEmail: document.querySelector('.feedback-form input'),
    formTextarea: document.querySelector('.feedback-form textarea')
}

refs.formTextarea.required = true;
refs.formEmail.required = true;

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(event) {
    event.preventDefault();
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, formDataJSON);
}

function populateForm() {
    const savedFormDataJSON = localStorage.getItem(STORAGE_KEY);
    const savedFormData = JSON.parse(savedFormDataJSON);

    if (savedFormDataJSON) {
        refs.formEmail.value = savedFormData.email;
        refs.formTextarea.value = savedFormData.message;
    }
}
