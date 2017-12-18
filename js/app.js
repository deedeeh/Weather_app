let accessData;
let tempIsDegrees = false;
let icons;

//Cache DOM elements
let errorEl = document.getElementById("error");
let locationEl = document.getElementById("location");
let conditionEl = document.getElementById("condition");
let tempEl = document.getElementById("temp");

//Function to request position; latitude and longitude and get API url with XMLHTTPRequest
//This function when it is success
function getCurrentLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json'
  //onload of the request, data are retrieved from JSON API
  request.onload = function() {
    if(request.status === 200) {
      accessData = this.response;
      const location = accessData.name;
      const country = accessData.sys.country;
      const condition = accessData.weather[0].description;
      const tempC = accessData.main.temp;

      //link data to the DOM
      locationEl.innerHTML = location + ", " + country;
      conditionEl.textContent = condition.toUpperCase();
      tempEl.innerHTML = Math.round(tempC) + " &#176" + "C";

      //addEventListener to tempEl to toggle between Celsius and Fahrenheit
      tempEl.addEventListener("click", function() {
        tempEl.innerHTML = toggleTemp();
      });

      //Function to toggle between Celsius and Fahrenheit and is called inside a callback function
      function toggleTemp() {
        tempIsDegrees = !tempIsDegrees;
        if(tempIsDegrees) {
          return Math.round(tempC) + " &#176" + "C";
        } else {
          return Math.round(tempC) * 9/5 + 32 + " &#176" + "F";
        }
      }

      icons = new Skycons({
        "color": "#000";
        "resizeClear": true;  //this is for Android hack
      }),
      switch(condition) {
      case condition === mist:
        icons.add("conditionIcon", Skycons.FOG)
        break;

      }
      icons.play();
    }
  }
  request.send();
}

//this function is case of errors
function errors(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorEl.innerHTML = "User denied the request for location."
      break;
    case error.POSITION_UNAVAILABLE:
      errorEl.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      errorEl.innerHTML = "The request to get user location timed out."
      break;
  }
}

//get user geolocation and have 1st argument when it is success and 2nd argument in case of errors.
navigator.geolocation.getCurrentPosition(getCurrentLocation, errors);
