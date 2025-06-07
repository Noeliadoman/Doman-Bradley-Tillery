async function startWeatherGame() {
            const location = document.getElementById('location').value.trim();
            const gameArea = document.getElementById('game-area');
            const resultDiv = document.getElementById('result');

            if (!location) {
                resultDiv.innerHTML = '<p style="color:red;">Please enter a city name.</p>';
                return;
            }

            try {
                // Fetch 5-day forecast (3-hour steps)
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${apiKey}`
                );
                const data = await response.json();

                if (data.cod !== 200) {
                    resultDiv.innerHTML = `<p style="color:red;">${data.message || "Invalid location or error fetching forecast. This is the issue"}</p>`;
                    return;
                }

                currentCity = data.city.name;

                // Get tomorrow's date string (YYYY-MM-DD)
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const yyyy = tomorrow.getFullYear();
                const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
                const dd = String(tomorrow.getDate()).padStart(2, "0");
                const tomorrowDateStr = `${yyyy}-${mm}-${dd}`;

                // Filter all forecast entries that match tomorrow's date
                const tomorrowForecasts = data.list.filter(entry => entry.dt_txt.startsWith(tomorrowDateStr));

                if (tomorrowForecasts.length === 0) {
                    resultDiv.innerHTML = `<p style="color:red;">No forecast data available for tomorrow.</p>`;
                    return;
                }

                // Option 1: Pick the forecast closest to 12:00 PM (noon) tomorrow
                let targetForecast = tomorrowForecasts.reduce((prev, curr) => {
                    const prevDiff = Math.abs(new Date(prev.dt_txt).getHours() - 12);
                    const currDiff = Math.abs(new Date(curr.dt_txt).getHours() - 12);
                    return currDiff < prevDiff ? curr : prev;
                });

                const desc = targetForecast.weather[0].description.toLowerCase();
        
                // Map description to weatherOptions
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
                else actualTomorrowWeather = "Clear"; // fallback

                // Build game UI
                let gameHTML = `<h3>Guess tomorrow's weather in ${currentCity}:</h3>`;
                weatherOptions.forEach(option => {
                    gameHTML += `<button onclick="submitWeatherGuess('${option}')" class="weather-button">${option}</button>`;
                });
        
                gameArea.innerHTML = gameHTML;
                resultDiv.innerHTML = ""; // clear previous result
                weatherIcon.src = ""; // reset icon
                
            } catch (error) {
                console.error(error);
                resultDiv.innerHTML = '<p style="color:red;">An error occurred while fetching weather data.</p>';
            }
        }
        
        function submitWeatherGuess(userGuess) {
            const resultDiv = document.getElementById('result');
            const gameArea = document.getElementById('game-area');
            const isCorrect = userGuess === actualTomorrowWeather;
        
            resultDiv.innerHTML = isCorrect
                ? `<p style="color:green;">✅ Correct! It will be "${actualTomorrowWeather}" tomorrow in ${currentCity}.</p>`
                : `<p style="color:red;">❌ Wrong! It will actually be "${actualTomorrowWeather}" tomorrow in ${currentCity}.</p>`;
        
            // Disable buttons and color them
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
