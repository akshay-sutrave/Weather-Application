const weatherForm = document.querySelector('form');
const inputData = document.querySelector('input');
let message1 = document.querySelector('#message1');
let message2 = document.querySelector('#message2');
message1.textContent = '';
message2.textContent = '';
weatherForm.addEventListener('submit', (data) => {
    message1.textContent = 'Loading ...';
    message2.textContent = '';
    data.preventDefault();
    fetch('/weather?address=' + inputData.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = '';
                message2.textContent = data.error;
            } else {
                message1.textContent = data.forecast;
                message2.textContent = data.location;
            }
        })
    })
})