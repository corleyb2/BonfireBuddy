async function getBeer(url) {
  let fetchBeer = await fetch(url);
  let beerResponse = await fetchBeer.json();
  beerRender(beerResponse);
}

function beerRender(response) {
  for (let i = 0; i < response.length; i++) {
    document.getElementById("render-breweries").innerHTML += `<div class="card">
                  <p id="brewery-name${i}"></p>
                  <p id="brewery-street${i}"></p>
                  <p id="brewery-city${i}"></p>
                  <p id="brewery-state${i}"></p>
                  <p id="brewery-phone${i}"></p>
              </div>`;
    document.getElementById(
      `brewery-name${i}`
    ).innerHTML = `${response[i].name}`;
    document.getElementById(
      `brewery-street${i}`
    ).innerHTML = `${response[i].street}`;
    document.getElementById(
      `brewery-city${i}`
    ).innerHTML = `${response[i].city}`;
    document.getElementById(
      `brewery-state${i}`
    ).innerHTML = `${response[i].state}`;
    document.getElementById(`brewery-phone${i}`).innerHTML = `${response[
      i
    ].phone.slice(0, 3) +
      "-" +
      response[i].phone.slice(3, 6) +
      "-" +
      response[i].phone.slice(6)}`;
  }
}

function generateUrl() {
  let userZip = document.getElementById("user-zip").value;
  let beerUrl = "https://api.openbrewerydb.org/breweries?by_postal=";
  let beerLocUrl = beerUrl + userZip;
  document.getElementById("render-breweries").innerHTML = "";

  let weatherUrl1 = "http://api.openweathermap.org/data/2.5/weather?zip=";
  let weatherUrl2 = ",us&appid=26779bfb35d328d4b7b23cde92c1647a";
  let weatherLocUrl = weatherUrl1 + userZip + weatherUrl2;
  document.getElementById("render-weather").innerHTML = "";
  getWeather(weatherLocUrl);
  getBeer(beerLocUrl);
}

async function getWeather(url) {
  let weatherData = await fetch(url);
  let weatherResponse = await weatherData.json();
  weatherRender(weatherResponse);
}

function weatherRender(response) {
  document.getElementById("render-weather").innerHTML = `<div class="card-temp">
      <p id="weather-desc"></p>
      <p id="actual-temp"></p>
      <p id="feels-like-temp"></p>
      <p id="tonights-low"></p>
      </div>`;
  document.getElementById(
    `weather-desc`
  ).innerHTML = `Currently: ${response.weather[0].main}`;
  document.getElementById(
    `actual-temp`
  ).innerHTML = `Current Temperature: ${Math.round(
    response.main.temp * (9 / 5) - 459.67
  )} &#8457`;
  document.getElementById(
    `feels-like-temp`
  ).innerHTML = `Feels Like: ${Math.round(
    response.main.feels_like * (9 / 5) - 459.67
  )} &#8457`;
  document.getElementById(
    `tonights-low`
  ).innerHTML = `Tonight's Low: ${Math.round(
    response.main.temp_min * (9 / 5) - 459.67
  )} &#8457`;
}

async function getTrivia(url) {
  let triviaData = await fetch(url);
  let triviaResponse = await triviaData.json();
  triviaRender(triviaResponse);
}

function triviaRender(response) {
  for (let i = 0; i < response.results.length; i++) {
    document.getElementById(
      "render-trivia"
    ).innerHTML += `<div class="card-trivia">
      <p class="trivia-Q-A">Question: </p><p class="trivia-p" id="trivia-question${i}"></p><br />
      <p class="trivia-Q-A">Answer: </p><p class="trivia-p" id="trivia-answer${i}"></p>
    </div>`;
    document.getElementById(
      `trivia-question${i}`
    ).innerHTML = `${response.results[i].question}`;
    document.getElementById(
      `trivia-answer${i}`
    ).innerHTML = `${response.results[i].correct_answer}`;
  }
}

function generateTriviaUrl() {
  let userDropdown = document.getElementById("trivia-dropdown").value;
  let triviaUrl = "https://opentdb.com/api.php?amount=5&category=";
  let triviaFullUrl = triviaUrl + userDropdown;
  document.getElementById("render-trivia").innerHTML = "";
  getTrivia(triviaFullUrl);
}
