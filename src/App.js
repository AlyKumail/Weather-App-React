import axios from "axios";
import { useState } from "react";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("night");
    var weatherImg = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a69cac70324cb4f6032095694a062663`;
    function displayIcon(weather) {
        if (weather === "Clouds") {
            return (
                <div>
                    <img className="cloud" src="./cloud.png"></img>
                    <img className="clouds" src="./clouds.png"></img>
                    <img className="clouds-1" src="./clouds.png"></img>
                    <img className="clouds-2" src="./clouds.png"></img>
                </div>
            );
        } else if (weather === "Clear" && time === "day") {
            return (
                <div>
                    <img className="sun" src="./sun.png"></img>
                    <img className="sunMain" src="./sunMain.png"></img>
                </div>
            );
        } else if (weather === "Clear" && time === "night") {
            return (
                <div>
                    <img className="" src="./moon.png"></img>
                    <img className="sunMain" src="./moonMain.png"></img>
                </div>
            );
        } else if (
            (weather === "Haze" || weather === "Smoke") &&
            time === "night"
        ) {
            return (
                <div>
                    <img className="" src="./haze.png"></img>
                    <img className="sunMain" src="./moonMain.png"></img>
                </div>
            );
        } else if (weather === "Rain") {
            return (
                <div>
                    <img src="./rain.png"></img>

                    <img className="clouds" src="./rains.png"></img>
                    <img className="clouds-1" src="./rains.png"></img>
                    <img className="clouds-2" src="./rains.png"></img>
                </div>
            );
        } else if (weather === "Drizzle") {
            return (
                <div>
                    <img src="./rain.png"></img>

                    <img className="clouds" src="./clouds.png"></img>
                    <img className="clouds-1" src="./clouds.png"></img>
                    <img className="clouds-2" src="./clouds.png"></img>
                </div>
            );
        } else if (weather === "Thunderstorm") {
            return (
                <div>
                    <img src="./ts.png"></img>
                    {/* <img className="thunder" src="./thunder.png"></img> */}
                    <img className="clouds" src="./thunderStorm.png"></img>
                    <img className="clouds-1" src="./thunderStorm.png"></img>
                    <img className="clouds-2" src="./thunderStorm.png"></img>
                </div>
            );
        } else if (weather === "Snow") {
            return <img src="./snow.png"></img>;
        } else if (weather === "Dust") {
            return <img src="./dust.png"></img>;
        }
    }
    const searchLocation = async (event) => {
        if (event.key === "Enter") {
            await axios.get(url).then((res) => {
                setData(res.data);
                console.log(res.data);
                // weatherUrl = `./${weather}.png`;
                console.log("Sunrise: " + res.data.sys["sunrise"]);
                if (
                    res.data.dt > res.data.sys["sunrise"] &&
                    res.data.dt < res.data.sys.sunset
                ) {
                    if (res.data.weather[0].main === "Clouds") {
                        setTime("day-cloud");
                        console.log("DayCloud");
                    } else {
                        setTime("day");
                        console.log("Day");
                    }
                } else {
                    setTime("night");
                    console.log("Night");
                }
            });

            setLocation("");
            console.log("Time:" + time);
        }
    };

    return (
        <div className={`app ${time}`}>
            <div className="search">
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    type="text"
                    placeholder="Enter Location"
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>
                            {data.name}{" "}
                            {data.sys && (
                                <span className="country">
                                    ({data.sys.country})
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="temp">
                        {data.main ? (
                            <h1>{parseInt(data.main.temp - 273)}°C</h1>
                        ) : null}
                        {data.weather && displayIcon(data.weather[0].main)}
                    </div>
                    <div className="description">
                        {data.weather && <p>{data.weather[0].main}</p>}
                    </div>
                </div>
                {data.main && (
                    <div className="bottom">
                        <div className="feels">
                            {data.main && (
                                <p className="bold">
                                    {parseInt(data.main.feels_like - 273)}°C
                                </p>
                            )}

                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main && (
                                <p className="bold">
                                    {parseInt(data.main.humidity)}%
                                </p>
                            )}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind && (
                                <p className="bold">
                                    {parseInt(data.wind.speed)}mph
                                </p>
                            )}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
