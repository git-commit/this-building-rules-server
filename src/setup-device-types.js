const request = require('superagent')
const config = require('config')

var apiUrl = 'https://api.preview.oltd.de/v1/device-types/' + 'e5284fde-f520-4c03-ab32-652defe9423a'

var headers = {
  'Authorization': 'Bearer ' + config.lightelligence.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

var body = {
  'name': 'Presence sensor',
  'manufacturer': 'TBR',
  'model': 'V1',
  'description': 'Detects people inside the room',
  'reportingRules': [{
    'path': '$.attributes.numberOfPeople',
    'reportTo': ['timeseries']
  }],
  'schema': {
    'attributes': {
      'numberOfPeople': {
        'type': 'integer'
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
