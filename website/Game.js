const weatherOptions = [
  "Clear", "Few Clouds", "Scattered Clouds", "Broken Clouds",
  "Overcast Clouds", "Rain", "Thunderstorm", "Snow", "Mist", "Haze", "Fog"
];

let actualTomorrowWeather = "";
let currentCity = "";
let currentAnswerType = "";
let expectedAnswer = ""; 

async function startWeatherGame() {
  const location = document.getElementById('location').value.trim();
  const gameArea = document.getElementById('game-area');
  const resultDiv = document.getElementById('result');

  if (!location) {
    resultDiv.innerHTML = '<p style="color:red;">Please enter a city name.</p>';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod !== '200') {
      resultDiv.innerHTML = `<p style="color:red;">Error code: ${data.cod} - ${data.message || "Unknown error"}</p>`;
      return;
    }

    currentCity = data.city.name;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const tomorrowDateStr = `${yyyy}-${mm}-${dd}`;

    const tomorrowForecasts = data.list.filter(entry => entry.dt_txt.startsWith(tomorrowDateStr));

    if (tomorrowForecasts.length === 0) {
      resultDiv.innerHTML = `<p style="color:red;">No forecast data available for tomorrow.</p>`;
      return;
    }

    // Closest to noon
    let targetForecast = tomorrowForecasts.reduce((prev, curr) => {
      const prevDiff = Math.abs(new Date(prev.dt_txt).getHours() - 12);
      const currDiff = Math.abs(new Date(curr.dt_txt).getHours() - 12);
      return currDiff < prevDiff ? curr : prev;
    });

    const desc = targetForecast.weather[0].description.toLowerCase();
    if (desc.includes("clear")) actualTomorrowWeather = "Clear";
    else if (desc.includes("few clouds")) actualTomorrowWeather = "Few Clouds";
    else if (desc.includes("scattered clouds")) actualTomorrowWeather = "Scattered Clouds";
    else if (desc.includes("broken clouds")) actualTomorrowWeather = "Broken Clouds";
    else if (desc.includes("overcast")) actualTomorrowWeather = "Overcast Clouds";
    else if (desc.includes("rain")) actualTomorrowWeather = "Rain";
    else if (desc.includes("thunderstorm")) actualTomorrowWeather = "Thunderstorm";
    else if (desc.includes("snow")) actualTomorrowWeather = "Snow";
    else if (desc.includes("mist")) actualTomorrowWeather = "Mist";
    else if (desc.includes("haze")) actualTomorrowWeather = "Haze";
    else if (desc.includes("fog")) actualTomorrowWeather = "Fog";
    else actualTomorrowWeather = "Clear";

    const questionTemplates = [
      `How many inches is it predicted to rain in ${currentCity} tomorrow?`,
      `What will the weather be like tomorrow in ${currentCity}?`,
      `What do you think the high for tomorrow will be in ${currentCity}?`,
      `How windy do you think it will be tomorrow in ${currentCity}?`
    ];

    const randomIndex = Math.floor(Math.random() * questionTemplates.length);
    const selectedQuestion = questionTemplates[randomIndex];

    let gameHTML = `<h3>${selectedQuestion}</h3>`;

    //determine question type & input
    if (selectedQuestion.includes("weather")) {
      currentAnswerType = "condition";
      gameHTML += weatherOptions.map(option =>
        `<button onclick="submitWeatherGuess('${option}')" class="weather-button">${option}</button>`
      ).join("");
    } else if (selectedQuestion.includes("high")) {
      currentAnswerType = "temperature";
      expectedAnswer = Math.round(
        Math.max(...tomorrowForecasts.map(entry => entry.main.temp_max))
      );
      gameHTML += `
        <label>Guess the high (°F):</label>
        <input type="range" min="0" max="120" value="70" id="tempSlider" oninput="updateSliderDisplay('tempSlider', 'tempValue')">
        <span id="tempValue">70</span>°F
        <br><button onclick="submitSliderGuess()">Submit</button>
      `;
    } else if (selectedQuestion.includes("rain")) {
      currentAnswerType = "rainfall";
      let totalRain = tomorrowForecasts.reduce((sum, entry) => sum + (entry.rain?.["3h"] || 0), 0);
      expectedAnswer = parseFloat(totalRain.toFixed(1));
      gameHTML += `
        <label>Guess rainfall (inches):</label>
        <input type="range" min="0" max="10" step="0.1" value="0" id="rainSlider" oninput="updateSliderDisplay('rainSlider', 'rainValue')">
        <span id="rainValue">0</span> inches
        <br><button onclick="submitSliderGuess()">Submit</button>
      `;
    } else if (selectedQuestion.includes("wind")) {
      currentAnswerType = "wind";
      expectedAnswer = Math.round(
        Math.max(...tomorrowForecasts.map(entry => entry.wind.speed))
      );
      gameHTML += `
        <label>Guess wind speed (mph):</label>
        <input type="range" min="0" max="50" value="10" id="windSlider" oninput="updateSliderDisplay('windSlider', 'windValue')">
        <span id="windValue">10</span> mph
        <br><button onclick="submitSliderGuess()">Submit</button>
      `;
    }

    gameArea.innerHTML = gameHTML;
    resultDiv.innerHTML = "";

  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = '<p style="color:red;">An error occurred while fetching weather data.</p>';
  }
}

function updateSliderDisplay(sliderId, valueId) {
  document.getElementById(valueId).textContent = document.getElementById(sliderId).value;
}

function submitWeatherGuess(userGuess) {
  const resultDiv = document.getElementById('result');
  const gameArea = document.getElementById('game-area');
  const isCorrect = userGuess === actualTomorrowWeather;

  resultDiv.innerHTML = isCorrect
    ? `<p style="color:green;">✅ Correct! It will be "${actualTomorrowWeather}" tomorrow in ${currentCity}.</p>`
    : `<p style="color:red;">❌ Not Quite! It will actually be "${actualTomorrowWeather}" tomorrow in ${currentCity}.</p>`;

  const buttons = gameArea.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === actualTomorrowWeather) {
      btn.style.border = "2px solid green";
      btn.style.backgroundColor = "#d4f4dd";
    } else if (btn.textContent === userGuess) {
      btn.style.border = "2px solid red";
      btn.style.backgroundColor = "#f4d4d4";
    }
  });
}

// slider submissions
function submitSliderGuess() {
  const resultDiv = document.getElementById('result');
  let guess = 0;

  if (currentAnswerType === "temperature") {
    guess = parseInt(document.getElementById('tempSlider').value);
    resultDiv.innerHTML = `🌡️ Actual high: ${expectedAnswer}°F<br>Your guess: ${guess}°F`;
  } else if (currentAnswerType === "rainfall") {
    guess = parseFloat(document.getElementById('rainSlider').value);
    resultDiv.innerHTML = `🌧️ Actual rain: ${expectedAnswer} in<br>Your guess: ${guess} in`;
  } else if (currentAnswerType === "wind") {
    guess = parseInt(document.getElementById('windSlider').value);
    resultDiv.innerHTML = `💨 Actual wind: ${expectedAnswer} mph<br>Your guess: ${guess} mph`;
  }

  // Optional: Add color feedback
  const diff = Math.abs(expectedAnswer - guess);
  if (diff < 3) {
    resultDiv.innerHTML += `<br><span style="color:green;">✅ Great guess!</span>`;
  } else {
    resultDiv.innerHTML += `<br><span style="color:red;"> Not quite. Try again tomorrow!</span>`;
  }

  // Disable slider and submit
  const slider = document.querySelector('input[type="range"]');
  const btn = document.querySelector('button');
  if (slider) slider.disabled = true;
  if (btn) btn.disabled = true;
}
