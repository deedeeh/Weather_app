
let output = document.getElementById("output");

function getCurrentLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const api =  "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;

  $.getJSON(api, function(data) {
    const weather = data.weather.main;
    console.log(weather);
  });
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
