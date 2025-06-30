# 🌦️ Weather App

A simple Node.js and Express-based weather application that allows users to check the current weather in any city around the world using the OpenWeatherMap API.

---

## 🚀 Features

- 🌍 Search for any city's current weather
- 🌡️ Displays temperature in Celsius
- ☁️ Shows a short weather description
- 🖼 Displays weather condition icons
- 📦 Built with Node.js, Express, and HTTPS
- 🧾 Uses the OpenWeatherMap API

---

## 📸 Preview

![Weather App Screenshot](https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png)  
*A screenshot or animated demo can go here if you upload one later.*

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Body-Parser
- OpenWeatherMap API
- HTML & CSS

---

## 🧰 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

---

## 📁 Project Structure

weather-app/
│
├── app.js # Main server file
├── index.html # Home page form
├── style.css # Optional: styling for index.html
├── .env # Environment variables
├── package.json # Project metadata and scripts
└── node_modules/ # Dependencies


---

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app

📝 How It Works
User enters a city name into the form.

A POST request is made to your server.

The server queries the OpenWeatherMap API with the city name.

The server parses the JSON response and extracts:

Temperature

Weather description

Weather icon

The server sends a response back with formatted weather data.

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgements
OpenWeatherMap

Node.js

Express.js
