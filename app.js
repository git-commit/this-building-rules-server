const config = require('config')
const request = require('superagent')
const ruleEngine = require('./src/rule_engine')
const db = require('./src/db/rule')
const cors = require('cors')

var apiUrl = 'https://api.preview.oltd.de/v1/users/' + config.olt.osram_id + '/tenants'

var headers = {
  'Authorization': 'Bearer ' + config.olt.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

request.get(apiUrl)
  .set(headers)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.log(err)
    console.log(res.body)
  })

var state = {
  time: 8,
  assistant: null,
  inside: {
    co2: null,
    temperature: null,
    humidity: null,
    humans: null
  },
  outside: {
    temperature: null,
    humidity: null
  }
}

function getDeviceResponse (deviceId, token) {
  var apiUrl = `https://api.preview.oltd.de/v1/devices/${deviceId}/state`
  return request
    .get(apiUrl)
    .set('Authorization', token)
    .set('Accept', 'application/json')
}

function updateState () {
  // beckhoff
  getDeviceResponse(config.deviceIds.bh, 'Bearer ' + config.olt.bh_token)
    .then((res) => {
      state.inside.co2 = res.body.data.attributes.WRF04.properties.CO2
      state.inside.temperature = res.body.data.attributes.WRF04.properties.TemperatureWRF
      state.inside.humidity = res.body.data.attributes.FTKPlus.properties.Humidity

      state.outside.temperature = res.body.data.attributes.FTKPlus2.properties.TemperatureFTK
      state.outside.humidity = res.body.data.attributes.FTKPlus2.properties.Humidity

      console.log(state)
      ruleEngine.checkRules(state)
    })

  // our own sensors
  getDeviceResponse(config.deviceIds.presence, 'Bearer ' + config.olt.auth_token)
    .then((res) => {
      console.log(res.body)
      state.inside.humans = res.body.data.attributes.numberOfPeople
      console.log(state)
      ruleEngine.checkRules(state)
    })

  getDeviceResponse(config.deviceIds.assistant, 'Bearer ' + config.olt.auth_token)
    .then((res) => {
      state.assistant = res.body.data.attributes.lastCommand
      console.log(state)
      ruleEngine.checkRules(state)
    })
}

setInterval(updateState, 500)

// express api routing
const express = require('express')
var app = express()
app.use(cors())

app.get('/', function (req, res) {
  res.send({
    state: state,
    stateIds: ruleEngine.stateIds,
    typeNames: ruleEngine.typeNames,
    actionNames: ruleEngine.actionNames,
    rules: db.getAllRules()
  })
})

app.get('/hack-time', function (req, res) {
  state.time = 18
  res.send({"Success": "Yay"})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
