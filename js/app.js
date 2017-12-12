
let output = document.getElementById("output");

function getCurrentLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  output.innerHTML = `Latitude = ${latitude} and Longitude = ${longitude}`;

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
