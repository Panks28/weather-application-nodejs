const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('.error');
const msg2 = document.querySelector('.wForecast');

weatherForm.addEventListener('submit', function (event){
    event.preventDefault()
    const Location = search.value;

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address=' + Location).then (function (response) {

        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                
            } else { 
                msg1.textContent = "Location: " + data.Address
                msg2.textContent =  "Weather Forecast: " + data.WeatherForecast;
                
            }
            
        })

});


})