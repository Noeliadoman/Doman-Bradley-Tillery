# Overview

This document is intended to convey a software requirements specification guide for the Weather Data team in CIS350-02 this semester at GVSU.

# Software Requirements
This Software Requirements Specification (SRS) outlines the final functional and non-functional requirements for our Weather Dashboard application. The application uses the OpenWeatherMap API to allow users to search weather data by location, view forecasts, and interact with a weather guessing game. This document is intended for developers, stakeholders, and instructors to understand and validate the system's capabilities.


## Functional Requirement

### Current Weather Display
| ID  | Requirement |
|-----|-------------|
| FR1 | The website shall display the current temperature for the user's chosen location. |
| FR2 | The website shall display the current precipitation, if there is any. |
| FR3 | The website shall display the current wind speed if the current wind speed is over 5 mph. |
| FR4 | The website shall display any other current weather data of the developers' choosing. |
| FR5 | The website shall display an error message if it encounters isseus retreavig the weather data. |

### Future Weather Display
| ID  | Requirement |
|-----|-------------|
| FR6 | The website shall display a forcast of the high and low tempratures. |
| FR7 | The website shall display a forcast for the precipitation. |
| FR8 | The website shall display other future weather data of the developers' choosing. |

### Location
| ID  | Requirement |
|-----|-------------|
| FR9 | The user shall have the ability to change their location. |
| FR10 | The website shall display an error if the location is not valid. |
  
### Weather Game
| ID  | Requirement |
|-----|-------------|
| FR11 | The website shall have a game that uses the weather data to create a quiz for users. |
| FR12 | The user shall be able to guess the weather for the next day in a chosen city. |
| FR13 | The system shall fetch forecast data for the next day. |
| FR14 | The system shall compare the user's guess with the forecasted condition. |
| FR15 | The system shall display correct or incorrect feedback. |
  
### Settings & Accessibility and Login
| ID  | Requirement |
|-----|-------------|
| FR16 | The website shall allow users to choose between Celsius and Fahrenheit. |
| FR17 | The user shall be able to initiate a login with a username. |
| FR18 | The website shall have configurable text size. |
| FR19 | The website shall have various themes such as light/dark, high-contrast, or color blind mode. |
| FR20 | The system shall persist the selected theme during the session. |

### Weather Search Feature
| ID  | Requirement |
|-----|-------------|
| FR21 | The user shall be able to input a city to search for weather data. |
| FR22 | The system shall fetch weather data from the OpenWeatherMap API. |
| FR23 | The system shall display current temperature, humidity, and weather condition. |
| FR24 | The weather data shall include high and low temperatures. |
| FR25 | The system shall display a weather condition icon that corresponds to the current weather. |


## Non-Functional Requirements

### API usage
| ID  | Requirement |
|-----|-------------|
| NFR1 | The website shall pull weather data from an online API. |

### Location
| ID  | Requirement |
|-----|-------------|
| NFR2 | The website shall take user input when changing the location. |

### Error checking
| ID  | Requirement |
|-----|-------------|
| NFR3 | If the system encounters an issue reading the API, it shall retry up to 3 times. |
| NFR4 | If the user enters an incorrect location, the website shall prompt again for a re-entry. |
  
### Settings & accessibility 
| ID  | Requirement |
|-----|-------------|
| NFR5 | The website shall have a settings menu accessible from the main display page. |
| NFR6 | The settings menu shall be interactive. |
| NFR7 | The user interface shall be intuitive and usable by the average person with no prior training. |
| NFR8 | The system shall support high-contrast mode. |

### Performance
| ID  | Requirement |
|-----|-------------|
| NFR9 | The website must be able to handle a minimum of 10 users at a time. |
| NFR10 | The system shall respond to user input within 5 seconds. |
| NFR11 | The API response shall be displayed within 5 second of retrieval. |
| NFR12 | The theme switch shall complete within 2 seconds. |
   
### Usability 
| ID  | Requirement |
|-----|-------------|
| NFR13 | Font and layout shall be readable across devices. |
| NFR14 | Weather icons shall visually represent the forecast clearly. |
| NFR15 | Input fields shall have placeholders guiding user actions. |

# Software Artifacts

The section is to provide a visual and structural representation of our application's design. The artifacts linked below help instructors, reviewers and developers understand how our system works. It emphasizes how users interaection, how things are organized and how the data flows. 

* [Use Case Diagram]([link_to_your_use_case.png](https://github.com/Noeliadoman/Doman-Bradley-Tillery/blob/main/artifacts/use_case_diagram/Weather%20Dashboard%20Use-Case-Diagram.pdf))
* [Class Diagram](link_to_your_class_diagram.png)
* [Communication Diagram]([link_to_your_class_diagram.png](https://github.com/Noeliadoman/Doman-Bradley-Tillery/blob/57d8baacaef8b988d7d846091f2c845442b3cef3/docs/Communication_Diagram.jpg))
* [Object Diagram](https://github.com/Noeliadoman/Doman-Bradley-Tillery/blob/57d8baacaef8b988d7d846091f2c845442b3cef3/docs/Object_Diagram.pdf)
* [Sequence Diagram](link_to_your_sequence_diagram.png)
* [GitHub Repository](https://github.com/Noeliadoman/Doman-Bradley-Tillery.git)

# Test Specification 

This section outlines the testing strategy, test cases and validation criteria used to make sure the software system meets its functional and non-functional requirements. 

## Unit tests


| ID  | Description | Steps | Input Values | Expected Output | Actual Output | Pass/Fail | Requirement Link |
| :-------------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| TC1 | Handle empty location input | 1. Load page 2. Click "Search" with empty input | "" | Red error: "Please enter a city name." | <actual output of test case> | <did it pass or fail> | NFR1, RF1, RF2, RF3 |
| TC2 | 	Valid location fetch | 1. Enter "Grand Rapids" 2. Click "Search" | "Grand Rapids" | Displays today’s weather and icon | <actual output of test case> | <did it pass or fail> | FR1 |
| TC3 | Invalid location input | 1. Enter "asdfgh" 2. Click "Search" | "asdfgh" | Red error: "Invalid location!" | <actual output of test case> | <did it pass or fail> | FR10 |
| TC4 | Correct weather game guess | 1. Enter valid city 2. Click "Weather Game" 3. Guess correct weather | "Clear" (actual = Clear) | ✅ Message: "Correct! It will be Clear tomorrow in X" | <actual output of test case> | <did it pass or fail> | FR15 |

## Integration tests

| ID  | Description | Steps | Input Values | Expected Output | Actual Output | Pass/Fail | Requirement Link |
| :-------------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| TC5 | Weather API integration | 1. Enter city 2. Weather fetch from OpenWeather API | "Detroit" | Receives weather data, displays forecast | <actual output of test case> | <did it pass or fail> | NFR1, NFR10, NFR11 |
| TC6 | Theme application integration | 1. Open Settings 2. Change theme 3. Check if UI reflects new theme | Theme = "Dark" | Page switches to dark mode | <actual output of test case> | <did it pass or fail> | FR19, NFR12 |
| TC7 | Save user credentials | 1. Click "Login" 2. Enter username/password 3. Check localStorage | "UserX", "abc123" | localStorage key user_UserX is created | <actual output of test case> | <did it pass or fail> | FR17 |

## System tests

| ID  | Description | Steps | Input Values | Expected Output | Actual Output | Pass/Fail | Requirement Link |
| :-------------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| TC8 | Weather game flow | 1. Enter city 2. Start game 3. Make a guesst | "Chicago", "Rain" | Displays result + disables buttons | <actual output of test case> | <did it pass or fail> | FR15, NFR10, NFR11 |
| TC9 | Theme consistency | 1. Select theme 2. Play game | "Cool Blue" | Theme remains active throughout interaction | <actual output of test case> | <did it pass or fail> | NFR6, NFR12 |
| TC10 | Error when no forecast exists | 1. Enter city with no data (simulate API fail) 2. Start game | "Atlantis" | Displays error: "No forecast data available for tomorrow." | <actual output of test case> | <did it pass or fail> | NFR9, NFR10 |











