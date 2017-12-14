
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
      const accessData = this.response;
      const location = accessData.name;
      const country = accessData.sys.country;
      const condition = accessData.weather[0].main;
      const temp = accessData.main.temp;

      locationEl.innerHTML = location + ", " + country;
      conditionEl.textContent = condition;
      tempEl.innerHTML = Math.round(temp) + " &#176" + "C";
    }
    // tempEl.addEventListener("click", function() {
    //   if(temp.innerHTML === temp) {
    //     const tempF = temp * 9/5 + 32;
    //     tempEl.innerHTML = Math.round(tempF) + " &#176" + "F";
    //   } else {
    //     return temp;
    //   }
    // });
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
