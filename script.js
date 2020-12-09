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
  console.log(res.data);
});
