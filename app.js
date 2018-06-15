const config = require('config')
const sa = require('superagent')

const li = config.lightelligence

var apiUrl = 'https://api.preview.oltd.de/v1/users/' + li.osram_id + '/tenants'

var headers = {
  'Authorization': 'Bearer ' + li.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

sa.get(apiUrl)
  .set(headers)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.log(err)
    console.log(res.body)
  })
