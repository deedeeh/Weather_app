
let output = document.getElementById("output");

function getCurrentLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json'
  request.onload = function() {
    output.textContent = request.status;
    console.log(request);
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
