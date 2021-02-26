import React, { useState } from 'react'
import axios from 'axios';
import './Weather.scss'

export default function Weather() {
    const [isStart, setIsStart] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [current, setCurrent] = useState({
        city: "Sydney",
        weather: "",
        temperature: [],
    })
    const [cityList] = useState(["Sydney", "Melborne", "Brisbane"])
    const [weatherData, setWeatherData] = useState([])

    // 切换城市
    function switchCity(step) {
        let index = currentIndex + step
        index = index === weatherData.length ? 0 : index
        index = index === -1 ? weatherData.length - 1 : index

        setCurrent(weatherData[index])
        setCurrentIndex(index)
    }

    // 通过axios获取天气数据
    function getWeatherData() {
        axios.get('http://127.0.0.1:8000/weather?city=' + current.city)
            .then(function (response) {
                setCurrent(response.data)
                weatherData[currentIndex] = response.data
                setWeatherData(weatherData)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // 初始化weatherData
    React.useEffect(() => {
        let temp = []
        cityList.forEach(city => {
            temp.push({
                city: city,
                weather: "",
                temperature: [],
            })
        })
        setWeatherData(temp)
        // eslint-disable-next-line
    }, [])

    if (isStart) {
        return (
            <div id="background" className="img">
                <div id="leftArrow" className="img arrow" onClick={() => switchCity(-1)}></div>
                <div className="main">
                    <div className="cityName">{current.city}</div>
                    <div className="info" style={{ display: current.weather ? "flex" : "none" }}>
                        <div className="img weatherIcon" id={current.weather}></div>
                        <div className="temperatureNow">{current.temperature[1]}°</div>
                        <div className="temperatureRange">
                            <div>{current.temperature[0]}°</div>
                            <div>{current.temperature[2]}°</div>
                        </div>
                        <div className="weatherName">{current.weather.charAt(0).toUpperCase() + current.weather.slice(1)}</div>
                    </div>
                    <div id="refresh" className="img"
                        style={{ display: current.weather ? "none" : "block" }}
                        onClick={() => getWeatherData()}></div>
                </div>
                <div id="rightArrow" className="img arrow" onClick={() => switchCity(1)}></div>
            </div>
        )
    } else {
        return (
            <div id="start">
                <button onClick={() => setIsStart(true)}>Start App</button>
            </div>
        )
    }
}
