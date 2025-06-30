const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); 

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apikey = process.env.OPENWEATHER_API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            
            if (weatherData.cod !== 200) {
                return res.send(`
                    <html>
                    <head>
                        <title>Weather App</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                color: #333;
                            }
                            .weather-card {
                                background: rgba(255, 255, 255, 0.9);
                                border-radius: 20px;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                                padding: 30px;
                                text-align: center;
                                max-width: 400px;
                                width: 90%;
                            }
                            h1 {
                                color: #ff6b6b;
                                margin-bottom: 20px;
                            }
                            .error {
                                color: #ff4757;
                                font-size: 1.2em;
                            }
                            .back-btn {
                                display: inline-block;
                                margin-top: 20px;
                                padding: 10px 20px;
                                background: linear-gradient(to right, #ff758c, #ff7eb3);
                                color: white;
                                text-decoration: none;
                                border-radius: 30px;
                                font-weight: bold;
                                transition: all 0.3s ease;
                            }
                            .back-btn:hover {
                                transform: translateY(-3px);
                                box-shadow: 0 5px 15px rgba(255, 117, 140, 0.4);
                            }
                        </style>
                    </head>
                    <body>
                        <div class="weather-card">
                            <h1>Weather App</h1>
                            <p class="error">City not found. Please try again.</p>
                            <a href="/" class="back-btn">Try Another City</a>
                        </div>
                    </body>
                    </html>
                `);
            }

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const feelsLike = weatherData.main.feels_like;
            
            let bgGradient;
            if (temp < 10) {
                bgGradient = "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"; // Cold
            } else if (temp < 25) {
                bgGradient = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"; // Moderate
            } else {
                bgGradient = "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)"; // Hot
            }

            res.send(`
                <html>
                <head>
                    <title>Weather in ${query}</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background: ${bgGradient};
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                            color: #333;
                        }
                        .weather-card {
                            background: rgba(255, 255, 255, 0.9);
                            border-radius: 20px;
                            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                            padding: 30px;
                            text-align: center;
                            max-width: 400px;
                            width: 90%;
                            animation: fadeIn 0.5s ease-in-out;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        h1 {
                            color: #4b6cb7;
                            margin-bottom: 5px;
                        }
                        .city {
                            font-size: 2em;
                            color: #2c3e50;
                            margin-bottom: 20px;
                        }
                        .temp {
                            font-size: 3em;
                            font-weight: bold;
                            color: #e74c3c;
                            margin: 10px 0;
                        }
                        .description {
                            font-size: 1.5em;
                            color: #3498db;
                            text-transform: capitalize;
                            margin-bottom: 20px;
                        }
                        .weather-icon {
                            width: 100px;
                            height: 100px;
                            margin: 0 auto;
                        }
                        .details {
                            display: flex;
                            justify-content: space-around;
                            margin-top: 20px;
                            flex-wrap: wrap;
                        }
                        .detail-item {
                            margin: 10px;
                        }
                        .detail-value {
                            font-size: 1.2em;
                            font-weight: bold;
                            color: #2c3e50;
                        }
                        .detail-label {
                            font-size: 0.9em;
                            color: #7f8c8d;
                        }
                        .back-btn {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            background: linear-gradient(to right, #4b6cb7, #182848);
                            color: white;
                            text-decoration: none;
                            border-radius: 30px;
                            font-weight: bold;
                            transition: all 0.3s ease;
                        }
                        .back-btn:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 5px 15px rgba(75, 108, 183, 0.4);
                        }
                    </style>
                </head>
                <body>
                    <div class="weather-card">
                        <h1>Weather Report</h1>
                        <div class="city">${query}</div>
                        <div class="temp">${Math.round(temp)}°C</div>
                        <div class="description">${weatherDescription}</div>
                        <img src="${imageURL}" alt="Weather Icon" class="weather-icon">
                        <div class="details">
                            <div class="detail-item">
                                <div class="detail-value">${Math.round(feelsLike)}°C</div>
                                <div class="detail-label">Feels Like</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-value">${humidity}%</div>
                                <div class="detail-label">Humidity</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-value">${windSpeed} m/s</div>
                                <div class="detail-label">Wind Speed</div>
                            </div>
                        </div>
                        <a href="/" class="back-btn">Check Another City</a>
                    </div>
                </body>
                </html>
            `);
        });
    }).on("error", function(error) {
        console.error(error);
        res.send(`
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .error-container {
                        background: white;
                        padding: 30px;
                        border-radius: 15px;
                        text-align: center;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    }
                    h1 {
                        color: #ff4757;
                    }
                    .back-btn {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background: #ff4757;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background 0.3s;
                    }
                    .back-btn:hover {
                        background: #ff6b81;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>Oops!</h1>
                    <p>Something went wrong while fetching weather data.</p>
                    <p>Please try again later.</p>
                    <a href="/" class="back-btn">Go Back</a>
                </div>
            </body>
            </html>
        `);
    });
});

app.listen(6500, function() {
    console.log("Server is running on port 6500");
});