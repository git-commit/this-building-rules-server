const request = require('superagent')
const config = require('config')

var apiUrl = 'https://api.preview.oltd.de/v1/device-types/' + 'e5284fde-f520-4c03-ab32-652defe9423a'

var headers = {
  'Authorization': 'Bearer ' + config.lightelligence.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

var body = {
  'name': 'Temperature Sensor',
  'manufacturer': 'TBR',
  'model': 'V1',
  'description': 'A simple temperature sensor',
  'reportingRules': [{
    'path': '$.attributes.temperature',
    'reportTo': ['timeseries']
  }],
  'schema': {
    'attributes': {
      'temperature': {
        'type': 'number'
      }
    }
  }
}

request
  .patch(apiUrl)
  .set(headers)
  .send(body)
  .set('Accept', 'application/json')
  .then((res) => console.log(res.body))
