let form = document.querySelector("#searchForm");
let queryDetails = document.querySelector("#queryDetails");
let queryContent = document.querySelector("#queryContent");
let cityname = document.querySelector("#cityname");
let temp = document.querySelector("#temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");

// Declare Variables
let searchHistory = [];
let today = luxon.DateTime.local().toLocaleString();

queryContent.hidden = true;
// Create function to call api
let currentWeather = async (userSearch) => {
  let res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=imperial&appid=b17d60e77dffd2e53cb818dad9614dfb`
  );
  let weatherData = res.data;
  // console.log(weatherData);
  let weatherIcon = weatherData.weather[0].icon;
  let img = document.createElement("IMG");
  img.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;

  cityname.append(`${weatherData.name}  ${today}`);
  cityname.append(img);
  temp.append(`Temperature: ${weatherData.main.temp} °F`);
  humidity.append(`Humidity: ${weatherData.main.humidity} %`);
  wind.append(`Wind Speed: ${weatherData.wind.speed} MPH`);
};

//Add Event Listener on the input form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let userSearch = form.elements.query.value.trim();
  // console.log(userSearch);
  currentWeather(userSearch);
  queryContent.hidden = false;
  form.elements.query.value = "";
});
