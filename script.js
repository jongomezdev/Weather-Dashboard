const form = document.querySelector("#searchForm");
const queryDetails = document.querySelector("#queryDetails");
const queryContent = document.querySelector("#queryContent");
const cityname = document.querySelector("#cityname");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const uvindex = document.querySelector("#uvindex");

// Declare Variables
const searchHistory = [];
const today = luxon.DateTime.local().toLocaleString();

queryContent.hidden = true;
// Create function to call api
const currentWeather = async (userSearch) => {
  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=imperial&appid=b17d60e77dffd2e53cb818dad9614dfb`
  );
  const weatherData = res.data;
  // console.log(weatherData);
  const weatherIcon = weatherData.weather[0].icon;
  const img = document.createElement("IMG");
  img.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;

  cityname.append(`${weatherData.name}  ${today}`);
  cityname.append(img);
  temp.append(`Temperature: ${weatherData.main.temp} °F`);
  humidity.append(`Humidity: ${weatherData.main.humidity} %`);
  wind.append(`Wind Speed: ${weatherData.wind.speed} MPH`);
  //UV Index
  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b17d60e77dffd2e53cb818dad9614dfb`
    )
    .then(function (uviResponse) {
      // console.log(uviResponse);
      let uvIndex = uviResponse.data.value;
      // console.log(uvIndex);
      uvindex.append(`UV Index: ${uvIndex}`);
      //Creat UV Index colors with an if else statement
      if (uvIndex < 3) {
        uvindex.classList.add("uviGreen");
      } else if (uvIndex < 6) {
        uvindex.classList.add("uviYellow");
      } else if (uvIndex < 8) {
        uvindex.classList.add("uviOrange");
      } else if (uvIndex < 11) {
        uvindex.classList.add("uviRed");
      } else {
        uvindex.classList.add("ultraviolet");
      }
    });
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
