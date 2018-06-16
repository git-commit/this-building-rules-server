const config = require('config')
const request = require('superagent')
const ruleEngine = require('./src/rule_engine')

const li = config.lightelligence

var apiUrl = 'https://api.preview.oltd.de/v1/users/' + li.osram_id + '/tenants'

var headers = {
  'Authorization': 'Bearer ' + li.auth_token,
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
  inside: {
    co2: null,
    temperature: null,
    humidity: null
  },
  outside: {
    temperature: null,
    humidity: null
  }
}

const beckhoffId = 'cffbf07c-4789-4762-9895-c23f0298a495'
const beckhoffToken = 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNRWo4QkVEaWZnSnBfTzB3OEJCbEYxU05TNElmdlMyLWhERFBWTDRaTDYwIn0.eyJqdGkiOiIwMWUyMjgzMy1mZTdkLTQ0YjUtYTkzNS03YjE5YjE5ZjgwMzIiLCJleHAiOjE1MzAwMjMxMDEsIm5iZiI6MCwiaWF0IjoxNTI5MTU5MTAxLCJpc3MiOiJodHRwczovL2FwaS5wcmV2aWV3Lm9sdGQuZGUvYXV0aC9yZWFsbXMvb2x0IiwiYXVkIjoib2x0X3BvcnRhbCIsInN1YiI6ImMzZThhYjZmLTA3MDYtNDVhNC05Y2U1LWMyY2IwMDYyMmMzNyIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9sdF9wb3J0YWwiLCJub25jZSI6IkUxWHFta0N4ZGd5ZGs3UGhFcmNZQ2VVQmd4ZmFGYXg4NVVwb3ZZT0giLCJhdXRoX3RpbWUiOjE1MjkxNTkxMDEsInNlc3Npb25fc3RhdGUiOiI2NDQ1MDVmMS04NTg2LTQyNjYtOWFmYy0yMDc4NDVlMGQ0OWUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVzb3VyY2VfYWNjZXNzIjp7fSwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6Im9zci1vbHQtZ2F0ZXdheS1lazkxNjBAbWFpbGluYXRvci5jb20iLCJnaXZlbl9uYW1lIjoiT0xUIEdhdGV3YXkgIiwiZmFtaWx5X25hbWUiOiJFSzkxNjAiLCJlbWFpbCI6Im9zci1vbHQtZ2F0ZXdheS1lazkxNjBAbWFpbGluYXRvci5jb20iLCJ0ZW5hbnQiOiI5YzRkMDhjMS1hNmRmLTQyZmQtYWQ0MS1mNzZjYjRhY2Y5M2UifQ.lqzYoQzzRNavIbDvdYVWF-0DhsxMfxTwlDlEh6icuA5YrhFk83-ntT6jgEuu2n-1EKvptihgafrIUxfCTCMFkXsbHNMoPmd9tG0REyLLVMqY5uwzCrIQYL7jNyKlpsttV-sBU2ZLbRtu_DV0Iu550gZuYBuTGpoXvEiZ1ArdlDuHkDykrRHPAixZXe_9yeXspJ2OBp8F3URt83vYc1e8HCWOaNT_9iEnZSWVmlADjt85BAhBpjBG81IO6V4FVXwQbjo8I3acLldqG82O9LDlzgLdjLNMyFGJ2Gm1Ooxa3yRPNvI1z9xgoOUdOvDvKdEEwG1kywsvECmoCvp6U9QL1A'

function getDeviceResponse (deviceId, token) {
  var apiUrl = `https://api.preview.oltd.de/v1/devices/${deviceId}/state`
  return request
    .get(apiUrl)
    .set('Authorization', token)
    .set('Accept', 'application/json')
}

function updateState () {
  // beckhoff

  getDeviceResponse(beckhoffId, beckhoffToken)
    .then((res) => {
      state.inside.co2 = res.body.data.attributes.WRF04.properties.CO2
      state.inside.temperature = res.body.data.attributes.WRF04.properties.TemperatureWRF
      state.inside.humidity = res.body.data.attributes.FTKPlus.properties.Humidity

      state.outside.temperature = res.body.data.attributes.FTKPlus2.properties.TemperatureFTK
      state.outside.humidity = res.body.data.attributes.FTKPlus2.properties.Humidity

      console.log(state)
      ruleEngine.checkRules(state)
    })
}

setInterval(updateState, 500)
