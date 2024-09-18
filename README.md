# Weather-app
A simple weather application that allows users to search for weather information by city or fetch their current location's weather using the OpenWeatherMap API.
## Features
- **Get Weather by City**: Search for any city and get real-time weather information such as temperature, wind speed, humidity, and cloudiness.
- **Current Location Weather**: The app allows users to fetch weather based on their current geographical location using the browser's geolocation API.
- **Error Handling**: Displays an error message if the city is not found or if the API call fails for some reason.
- **Responsive UI**: Designed to work on a variety of devices.
## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- OpenWeatherMap API
## Setup Instructions
### Prerequisites
- A web browser (Chrome, Firefox, Edge, etc.)
- API Key from OpenWeatherMap (You can obtain one [here](https://home.openweathermap.org/users/sign_up))
### How to run the app locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
2. **Navigate to the project folder**:
   ```bash
   cd weather-app
3.**Insert your API Key**: Open index.js, and replace const API_KEY = "your_api_key"; with your OpenWeatherMap API Key.

4.**Open the** index.html file in a browser:
- You can simply double-click the index.html file to run the app.
- Alternatively, you can run a local server using tools like VSCode Live Server, Python HTTP Server, etc.

### How to get an API Key:
- Sign up at OpenWeatherMap.
- Navigate to the API keys section under your account.
- Copy the key and replace it in the index.js file where API_KEY is defined.

Project Structure
```bash
.
├── assets                   # Images and icons used in the app
├── index.html               # Main HTML file
├── index.js                 # JavaScript file for handling the app logic
├── style.css                # Main CSS file for styling the app
└── README.md                # You are here!
```
## Usuage
- Grant Location Access: Click the "Grant Access" button to allow the browser to fetch your current location and display weather information.
- Search for a City: Type the name of a city in the search bar and press Enter or click the search icon to get the weather details.
- Error Handling: If the city is not found, a "City not found" message will appear along with a retry option.

## License
This project is licensed under the MIT License.

## Acknowledgements
Weather data provided by OpenWeatherMap.
```bash
### Key Sections:
1. **Features**: Highlights the main features of the app.
2. **Technologies Used**: Lists the technologies used.
3. **Setup Instructions**: Steps to clone the project and set it up locally.
4. **How to Get an API Key**: Provides instructions to get an API key from OpenWeatherMap.
5. **Usage**: Basic usage guide for users.
6. **Project Structure**: Outlines the main files and folders.
7. **Screenshots**: You can add screenshots of your app to make it more informative.
8. **License**: Optionally, include the licensing information.

Replace the placeholder text (e.g., "yourusername") with your actual GitHub username or repository link. Also, feel free to customize the content further!
