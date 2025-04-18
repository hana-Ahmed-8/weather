var searchInput = document.querySelector("header input[type=search]");
var today = document.querySelector(".today .day");
var todayDate = document.querySelector(".today .date");
var locationSearch = document.querySelector(".today .location");
var todayTemp = document.querySelector(".today .temp");
var todayConditionImg = document.querySelector(".today img");
var todayCondition = document.querySelector(".today .condition");
var todayRainChance = document.querySelector(".moreTodayInfo .rain span");
var todayWindSpeed = document.querySelector(".moreTodayInfo .windSpeed span");
var todayWindDir = document.querySelector(".moreTodayInfo .windDir span");
var tomorrow = document.querySelector(".tomorrow .day");
var tomorrowConditionImg = document.querySelector(".tomorrow img");
var tomorrowTemp = document.querySelector(".tomorrow .temp");
var tomorrowTempMini = document.querySelector(".tomorrow .tempSmall");
var tomorrowCondition = document.querySelector(".tomorrow .condition");
var dayAfterTomorrow = document.querySelector(".dayAfterTomorrow .day");
var dayAfterTomorrowConditionImg = document.querySelector(".dayAfterTomorrow img");
var dayAfterTomorrowTemp = document.querySelector(".dayAfterTomorrow .temp");
var dayAfterTomorrowTempMini = document.querySelector(".dayAfterTomorrow .tempSmall");
var dayAfterTomorrowCondition = document.querySelector(".dayAfterTomorrow .condition");
var alertNameCountry = document.querySelector("div.alert");

function fetchWeather(city, callback) {
  var httpReq = new XMLHttpRequest();
  var url = "  http://api.weatherapi.com/v1/forecast.json?key=d7112510dd514f27baf174540251804&q=" + city + "&days=3&aqi=yes";

  httpReq.open("GET", url, true);

  httpReq.onreadystatechange = function () {
    if (httpReq.readyState === 4 && httpReq.status === 200) {
      var data = JSON.parse(httpReq.responseText);
      alertNameCountry.classList.replace("d-block", "d-none");
      callback(data);
    }
  };

  httpReq.send();
}

function showAllData(city) {
  showDateData();
  fetchWeather(city || "Egypt", function (obj) {
    showWeatherData(obj);
  });
}

function getDay(nextDay) {
  if (!nextDay) nextDay = 0;
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var d = new Date();
  d.setDate(d.getDate() + nextDay);
  return days[d.getDay()];
}

function getDate(nextDay) {
  if (!nextDay) nextDay = 0;
  var d = new Date();
  d.setDate(d.getDate() + nextDay);
  return d.toString().split(" ")[2] + d.toString().split(" ")[1];
}

function showDateData() {
  today.innerHTML = getDay();
  todayDate.innerHTML = getDate();
  tomorrow.innerHTML = getDay(1);
  dayAfterTomorrow.innerHTML = getDay(2);
}

function showWeatherData(obj) {
  // Today's data
  document.querySelector(".today .location").innerHTML = obj.location.name + ", " + obj.location.country;
  document.querySelector(".today .temp").innerHTML = obj.current.temp_c + "°C";
  document.querySelector(".today img").src = "https:" + obj.current.condition.icon;
  document.querySelector(".today .condition").innerHTML = obj.current.condition.text;
  document.querySelector(".today .rain span").innerHTML = obj.forecast.forecastday[0].day.daily_chance_of_rain + "%";
  document.querySelector(".today .windSpeed span").innerHTML = obj.current.wind_kph + " km/h";
  document.querySelector(".today .windDir span").innerHTML = obj.current.wind_dir;

  // Tomorrow's data
  document.querySelector(".tomorrow .temp").innerHTML = obj.forecast.forecastday[1].day.maxtemp_c + "°C";
  document.querySelector(".tomorrow .tempSmall").innerHTML = obj.forecast.forecastday[1].day.mintemp_c + "°C";
  document.querySelector(".tomorrow img").src = "https:" + obj.forecast.forecastday[1].day.condition.icon;
  document.querySelector(".tomorrow .condition").innerHTML = obj.forecast.forecastday[1].day.condition.text;

  // Day after tomorrow's data
  document.querySelector(".dayAfterTomorrow .temp").innerHTML = obj.forecast.forecastday[2].day.maxtemp_c + "°C";
  document.querySelector(".dayAfterTomorrow .tempSmall").innerHTML = obj.forecast.forecastday[2].day.mintemp_c + "°C";
  document.querySelector(".dayAfterTomorrow img").src = "https:" + obj.forecast.forecastday[2].day.condition.icon;
  document.querySelector(".dayAfterTomorrow .condition").innerHTML = obj.forecast.forecastday[2].day.condition.text;
}


searchInput.addEventListener("input", function () {
  showAllData(searchInput.value);
});

showAllData();



