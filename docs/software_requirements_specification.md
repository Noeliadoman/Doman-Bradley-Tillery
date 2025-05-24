# Overview

This document is intended to convey a software requirements specification guide for the Weather Data team in CIS350-02 this semester at GVSU.

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
  
4. Weather Quiz Game (Whether weather)
    11. The website shall have a game that uses the weather data to create a quiz for users
    12. The game shall ask the user various questions about past weather data, testing their ability to recall recent events or guess on not-so-recent facts.
  
5. Settings & Accessibility
    13. The website shall allow users to choose between Celsius and Fahrenheit.
    14. The website shall have configurable text size
    15. The website shall have various themes such as light/dark, high-contrast, or color blind mode 


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

10. Basic System things
    9. The website must be able to handle a minimum of 10 users at a time










