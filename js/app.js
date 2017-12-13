
let locationEl = document.getElementById("location");
let conditionEl = document.getElementById("condition");
let tempEl = document.getElementById("temp");

function getCurrentLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json'
  request.onload = function() {
    if(request.status === 200) {
      const location = request.response.name;
      const condition = request.response.weather[0].main;
      const temp = request.response.main.temp;
      function toFahrenheit(temp) {
        return temp * 9/5 + 32;
      }
      locationEl.textContent = location;
      conditionEl.textContent = condition;
      tempEl.textContent = temp;
    }
  }
  request.send();
}


function errors(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      output.innerHTML = "User denied the request for location."
      break;
    case error.POSITION_UNAVAILABLE:
      output.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      output.innerHTML = "The request to get user location timed out."
      break;
  }
}

navigator.geolocation.getCurrentPosition(getCurrentLocation, errors);
