$(document).ready(function () {
  console.log('ready');
  var locationApi = "https://freegeoip.net/json/";
  var weatherApi = "";
  var userLatitude = 0;
  var userLongitude = 0;
  var userLocation = "";

  $.getJSON(locationApi, function (locationData) {
    //console.log(locationData);
    userLatitude = locationData.latitude;
    userLongitude = locationData.longitude;
    weatherApi = "https://fcc-weather-api.glitch.me/api/current?lat=" + userLatitude + "&lon=" + userLongitude;
    console.log(weatherApi);
    userLocation = locationData.city + ", " + locationData.region_code + ", " + locationData.country_code + ".";
    $("#userLocation").html(userLocation);

    $.getJSON(weatherApi, function (weatherData) {
      console.log(weatherData);
      var fTemp = (weatherData.main.temp * (9 / 5) + 32).toFixed(1);
      var cTemp = ((fTemp - 32) * (5 / 9)).toFixed(1);
      var tempSwitch = true;

      $("#weatherIcon").html('<img src="' + weatherData.weather[0].icon + '" alt="Weather Icon" height="100" width="100">');
      $("#userTemp").html(fTemp + " &#176F");
      $("#userTemp").click(function () {
        if (tempSwitch === false) {
          $("#userTemp").html(fTemp + " &#176F");
          tempSwitch = true;
        } else {
          $("#userTemp").html(cTemp + " &#176C");
          tempSwitch = false;
        }

      });
      $("#windSpeed").html(weatherData.wind.speed + " Mph");
      $("#description").html(weatherData.weather[0].description);

    });
  });
});