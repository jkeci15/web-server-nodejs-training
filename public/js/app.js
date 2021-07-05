console.log('Client side js loading');

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const locationElement = document.querySelector('#location')
const forecastElement = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    locationElement.textContent = 'Loading...'
    forecastElement.textContent = ''
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationElement.textContent = data.error
            } else {
                locationElement.textContent = data.location
                forecastElement.textContent =data.forecast
            }
        })
    })
})