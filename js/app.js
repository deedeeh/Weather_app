let accessData;
let tempIsDegrees = true;
let icons;


//Cache DOM elements
let errorEl = document.getElementById("error");
let locationEl = document.getElementById("location");
let conditionEl = document.getElementById("condition");
let tempEl = document.getElementById("temp");
let loaderEl = document.getElementById("loader");

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
      const condition = accessData.weather[0].main;
      const tempC = accessData.main.temp;

      loaderEl.classList.remove("loader");

      //link data to the DOM
      locationEl.innerHTML = location + ", " + country;
      conditionEl.textContent = condition;
      tempEl.innerHTML = Math.round(tempC) + " &#176" + "C";

      //addEventListener to tempEl to toggle between Celsius and Fahrenheit
      //Function to toggle between Celsius and Fahrenheit and is called inside a callback function

      tempEl.addEventListener("click", function toggleTemp() {
          tempIsDegrees = !tempIsDegrees;
          if(tempIsDegrees) {
            tempEl.innerHTML = Math.round(tempC) + " &#176" + "C";
          } else {
            tempEl.innerHTML = Math.round(tempC) * 9/5 + 32 + " &#176" + "F";
          }
        });

      icons = new Skycons({
        "color": "black",
        "resizeClear": true  //this is for Android hack
      });

      switch(condition) {
      case 'Clouds':
        icons.set("icon", Skycons.CLOUDY);
        break;
      case 'Rain':
        icons.set("icon", Skycons.RAIN);
        break;
      case 'Snow':
        icons.set("icon", Skycons.SNOW);
        break;
      case 'Haze':
      case 'Fog':
      case 'Mist':
        icons.set("icon", Skycons.FOG);
        break;
      case 'Partly clouds':
        icons.set("icon", Skycons.PARTLY_CLOUDY);
        break;
      case 'Sunny':
        icons.set("icon", Skycons.CLEAR_DAY);
      case 'Clear':
        icons.set("icon", Skycons.CLEAR_NIGHT);
        break;
      case 'Wind':
        icons.set("icon", Skycons.WIND);
        break;
      case 'Sleet':
        icons.set("icon", Skycons.SLEET);
        break;
      default:
        console.log(condition);
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
