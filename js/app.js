
function getCurrentLocation(position) {
  var output = document.getElementById("output");
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  output.innerHTML = `Latitude = ${latitude} and Longitude = ${longitude}`;

}

navigator.geolocation.getCurrentPosition(getCurrentLocation);
