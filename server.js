const express = require('express');

const weatherData = [{
    city: "Sydney",
    weather: "sunny",
    temperature: [7, 14, 19],
}, {
    city: "Melborne",
    weather: "rain",
    temperature: [9, 12, 21],
}, {
    city: "Brisbane",
    weather: "cloudy",
    temperature: [10, 11, 16],
}]



const app = express()

app.get('/weather', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    let returnData = weatherData.find(i => {
        return i.city === request.query.city
    })
    response.send(JSON.stringify(returnData))
})

app.listen(8000, () => {
    console.log('Service started, http://127.0.0.1:8000/weather')
})