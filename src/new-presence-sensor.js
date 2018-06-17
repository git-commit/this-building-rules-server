const request = require('superagent')
const config = require('config')

// Setup a new device
const deviceTypeId = config.deviceTypes.window
var apiUrl = 'https://api.preview.oltd.de/v1/devices'

var headers = {
  'Authorization': 'Bearer ' + config.lightelligence.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

var body = {
  'info': {
    'name': 'Window 1',
    'deviceTypeId': deviceTypeId
  }
}

request
  .post(apiUrl)
  .set(headers)
  .send(body)
  .set('Accept', 'application/json')
  .then((res) => console.log(res.body))
