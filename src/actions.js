const config = require('config')
const request = require('superagent')

var headers = {
  'Authorization': 'Bearer ' + config.olt.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

function changeWindow (open) {
  console.log('Set window_opened to: ' + open)

  const url = config.olt.url + `devices/${config.deviceIds.window}`

  console.log(url)

  request
    .patch(url)
    .set(headers)
    .send({'custom': {'open': open}})
    .then((res) => console.log(res.body))
}

function changeLED (on) {

}

module.exports = {changeWindow, changeLED}
