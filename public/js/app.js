console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('p#message-1')
const msg2 = document.querySelector('p#message-2')

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  msg1.textContent = 'Loading...';
  msg2.textContent = '';

  const address = search.value;

  fetch('/weather?address=' + address)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        msg1.textContent = 'Error: ' + data.error;
        msg2.textContent = '';
      } else {
        msg1.textContent = 'Location: ' + data.location;
        msg2.textContent = 'Forecast: ' + data.forecast;
      }
    })
});