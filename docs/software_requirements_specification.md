# Overview

This document is intended to convey a software requirements specification guide for the Weather Data team in CIS350-02 this semester at GVSU.
This Software Requirements Specification (SRS) outlines the final functional and non-functional requirements for our Weather Dashboard application. The application uses the OpenWeatherMap API to allow users to search weather data by location, view forecasts, and interact with a weather guessing game. This document is intended for developers, stakeholders, and instructors to understand and validate the system's capabilities.


# Functional Requirement

1. Current Weather Display
    1. The website shall display the current temperature for the user's chosen location.
    2. The website shall display the current precipitation, if there is any.
    3. The website shall display the current wind speed if the current wind speed is over 5 mph.
    4. The website shall display any other current weather data of the developers' choosing.
    5. The website shall display an error message if it encounters isseus retreavig the weather data.

2. Future Weather Display
    6. The website shall display a forcast of the high and low tempratures.
    7. The website shall display a forcast for the precipitation. 
    8. The website shall display other future weather data of the developers' choosing.

3. Location
    9. The user shall have the ability to change their location
    10. The website shall display an error if the location is not valid
  
4. Weather Game
    11. The website shall have a game that uses the weather data to create a quiz for users
    12. The user shall be able to guess the weather for the next day in a chosen city.
    13. The system shall fetch forecast data for the next day.
    14. The system shall compare the user's guess with the forecasted condition.
    15. The system shall display correct or incorrect feedback.
  
5. Settings & Accessibility and Login
    16. The website shall allow users to choose between Celsius and Fahrenheit.
    17. The user shall be able to initiate a login with a username.
    18. The website shall have configurable text size
    19. The website shall have various themes such as light/dark, high-contrast, or color blind mode
    20. The system shall persist the selected theme during the session.

6. Weather Search Feature
    21. The user shall be able to input a city to search for weather data.
    22. The system shall fetch weather data from the OpenWeatherMap API.
    23. The system shall display current temperature, humidity, and weather condition.
    24. The weather data shall include high and low temperatures.
    25. The system shall display a weather condition icon that corresponds to the current weather.


# Non-Functional Requirements

6. API usage
    1. The website shall pull weather data from an online API

7. Location
    2. The location shall defalt to Allendale, MI
    3. The website shall take user input when changing the location

8. Error checking
    4. If the system encounters an issue reading the API, it shall retry up to 3 times
    5. If the user enters an incorrect location, the website shall prompt again for a re-entry
  
9. Settings & accessibility 
    6. The website shall have a settings menu accessible from the main display page
    7. The settings menu shall be interactive
    8. The user interface shall be intuitive and usable by the average person with no prior training.
    9. The system shall support high-contrast mode.

10. Performance
    10. The website must be able to handle a minimum of 10 users at a time
    11. The system shall respond to user input within 5 seconds.
    12. The API response shall be displayed within 5 second of retrieval.
    13. The theme switch shall complete within 2 seconds.
   
11. Usability 
    14. Font and layout shall be readable across devices.
    15. Weather icons shall visually represent the forecast clearly.
    16. Input fields shall have placeholders guiding user actions.











