const request = require('superagent')
const config = require('config')

// Presence sensor

var apiUrl = 'https://api.preview.oltd.de/v1/device-types/' + 'e5284fde-f520-4c03-ab32-652defe9423a'

var headers = {
  'Authorization': 'Bearer ' + config.olt.auth_token,
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

// Window
console.log('Window!')
apiUrl = 'https://api.preview.oltd.de/v1/device-types/'

headers = {
  'Authorization': 'Bearer ' + config.olt.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

body = {
  'name': 'Window',
  'manufacturer': 'TBR',
  'model': 'V1',
  'description': 'Your window to the world',
  'schema': {}
}

request
  .post(apiUrl)
  .set(headers)
  .send(body)
  .set('Accept', 'application/json')
  .then((res) => console.log(res.body))

// Google Assitant
console.log('Assistant!')
apiUrl = 'https://api.preview.oltd.de/v1/device-types/'

headers = {
  'Authorization': 'Bearer ' + config.olt.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

body = {
  'name': 'Google Assitant Input',
  'manufacturer': 'TBR',
  'model': 'V1',
  'description': '',
  'schema': {
    'attributes': {
      'lastCommand': {'type': 'string'}
    }
  }
}

request
  .post(apiUrl)
  .set(headers)
  .send(body)
  .set('Accept', 'application/json')
  .then((res) => console.log(res.body))
