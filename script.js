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
const today = luxon.DateTime.local().toLocaleString({
  weekday: "short",
  month: "short",
  day: "2-digit",
});

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
  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;
  // console.log(lat, lon);
  //UV Index api call
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b17d60e77dffd2e53cb818dad9614dfb`
    )
    .then(function (uviResponse) {
      // console.log(uviResponse);
      let uvIndex = uviResponse.data.value;
      // console.log(uvIndex);
      uvindex.append(`UV Index: ${uvIndex}`);
      fiveDayForecast(lat, lon);
      //Create UV Index colors
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

// 5 day forecast
function fiveDayForecast(lat, lon) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=b17d60e77dffd2e53cb818dad9614dfb`
    )
    .then(function (fiveDayResponse) {
      // console.log(fiveDayResponse.data.daily[1].dt);

      for (let i = 1; i < 6; i++) {
        let forecastInfo = {
          date: fiveDayResponse.data.daily[i].dt,
          icon: fiveDayResponse.data.daily[i].weather[0].icon,
          temp: fiveDayResponse.data.daily[i].temp.day,
          humidity: fiveDayResponse.data.daily[i].humidity,
        };
        // console.log(forecastInfo.icon);
        let forecastDate = luxon.DateTime.fromSeconds(
          forecastInfo.date
        ).toLocaleString({ weekday: "short", month: "short", day: "2-digit" });
        let forecastIcon = `<img src="https://openweathermap.org/img/w/${forecastInfo.icon}.png" />`;
        // console.log(forecastDate);
        forecastCard = $(`
          <div class="p-3">
            <div class="card bg-transparent text-light">
              <div class="card-body">
                <p>${forecastDate}</p>
                <p>${forecastIcon}</p> 
                <p>Temperature: ${forecastInfo.temp} °F</p>
                <p>Humidity: ${forecastInfo.humidity} %</p>
              </div>
            </div>
          </div>
        `);
        $("#fiveDay").append(forecastCard);
      }
    });
}

//Add Event Listener on the input form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let userSearch = form.elements.query.value.trim();
  // console.log(userSearch);
  currentWeather(userSearch);
  if (!searchHistory.includes(userSearch)) {
    searchHistory.push(userSearch);
    let cityEl = $(`
      <li class="list-group-item bg-transparent text-light">${userSearch}</li>
    `);
    $("#searchHistory").append(cityEl);
  }

  localStorage.setItem("userSearch", JSON.stringify(searchHistory));
  // console.log(searchHistory);
  queryContent.hidden = false;
  form.elements.query.value = "";
});

$(document).on("click", ".list-group-item", function () {
  let cityLI = $(this).text();
  currentWeather(cityLI);
  console.log(cityLI);
});
