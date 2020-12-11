// Declare Variables
let searchHistory = [];

queryContent.hidden = true;
// Create function to call api
let currentWeather = async (userSearch) => {
  let res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=imperial&appid=b17d60e77dffd2e53cb818dad9614dfb`
  );
  let weatherData = res.data;
  // console.log(weatherData);
  let weatherIcon = weatherData.weather[0].icon;
  let iconSRC = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

  cityname.append(weatherData.name);
  img.append(iconSRC);
  temp.append(`Temperature: ${weatherData.main.temp} °F`);
  humidity.append(`Humidity: ${weatherData.main.humidity} %`);
  wind.append(`Wind Speed: ${weatherData.wind.speed} MPH`);
};

//Add Event Listener on the input form button
$(".btn-success").on("click", function (e) {
  e.preventDefault();

  let userSearch = $("#cityName").val().trim();
  // console.log(userSearch);
  currentWeather(userSearch);
  queryContent.hidden = false;
  $("#cityName").val("");
});
