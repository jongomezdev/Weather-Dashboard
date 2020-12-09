// Grab DOM Elements
const form = document.querySelector("#searchForm");
//Add Event Listener
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userSearch = form.elements.query.value;
  // console.log(userSearch);

  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=imperial&appid=b17d60e77dffd2e53cb818dad9614dfb`
  );

  //Create constants to store the JSON data
  const weatherData = res.data;
  // console.log(weatherData);
  const cityName = weatherData.name;
  console.log(cityName);
  const temp = weatherData.main.temp;
  console.log(`Temperature: ${temp}`);
  const humidity = weatherData.main.humidity;
  console.log(`Humidity: ${humidity}%`);
  const windSpeed = weatherData.wind.speed;
  console.log(`Wind Speed: ${windSpeed} MPH`);
  const weatherIcon = weatherData.weather[0].icon;

  const img = document.createElement("IMG");
  img.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  document.body.append(img);
  // weatherData.weather[0].icon;
});
