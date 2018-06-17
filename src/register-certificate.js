const request = require('superagent')
const config = require('config')

// Register certificate
const deviceId = '61d369dd-1fa2-4b6a-b577-c70e88886c80'
var apiUrl = `https://api.preview.oltd.de/v1/devices/${deviceId}/certificates`
var headers = {
  'Authorization': 'Bearer ' + config.lightelligence.auth_token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

var cert = '-----BEGIN CERTIFICATE-----\nMIIE/jCCAuagAwIBAgIJANvVdmMxHlOqMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNV\nBAMMCWxvY2FsaG9zdDAeFw0xODA2MTYyMTE3MTJaFw0xOTA2MTYyMTE3MTJaMBQx\nEjAQBgNVBAMMCWxvY2FsaG9zdDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC\nggIBAMkT+VbrSxl6KftSBJ4bAwXggoCN6Fn1v4TdsKjGXm3nfkEmE00vVF7XIoZI\ngMUzUiSsuu5U91C9eNFCj/ycBhh7l5Ix01OF42NmLm1P3MeGc8TaI/ceHr1C8a54\nIrYtMSZzqB2TAUHjXnbMmQYEew3FA19vRLuEXpL4XqVaGxKNdLrDVncNn9pR01Lz\nTiXs87R80fFoYRADcS7sSTD33MnT5aAL1GohJbznj/YQkjXe1bYTaA1wmqNBWYSm\nul3leQrzEikJzjL4saG90CysDywkmRTDLDli3Bw7E9I8qdXckTJ+aY49TRosoJ9L\nTXyDfGf6CXogr7jqQktHL0MtBVRBMW2dYxcu4u2S1W+2KOGKTrv7bSnP0HwxhZC3\nBiI+pFPhFgTl4KrdESad/oFj2ayM/pbfx8hEIMvRSSUTpHqE3uLH2fGUBqTLuASf\njeHJ8KUsPEXhZw/YeN7SU7qkFsuOKzYWkJgYOtL8hIR0dP9QkBh5ABs0ji84TGo/\nRYcGFIgbb8vORTICQhLvMbseJi1GAXvaicWC+fDFN7uvZsUHvknBgyRSPWk1bC5X\nzdHztZ8taVAQwmYher+aJfZhiwvDbqGtk4GF90g7fOM7KMzigmEgashVhuyiILvw\nDKRIVWktZavifDVKEJXFswqZhBEhLfn/XoyOK3M25st/NXeRAgMBAAGjUzBRMB0G\nA1UdDgQWBBQ/dBH1+9CiwNKpwZYSHOiqKyKArTAfBgNVHSMEGDAWgBQ/dBH1+9Ci\nwNKpwZYSHOiqKyKArTAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IC\nAQAfyeYTZ0yJ0CvSBdJznIjCJVp3u5s/9Pldd5358WSekLhpDPumxAH/P++3lA+H\ny3CYOjQUtMsa/AjdkQ6aKmG4oKudU/ZlvvTbbaFKnKZtDKcy59XMWTksoTdbCkG7\n8NSDGJAIDEiv+T7LBse0W3F9w3RJGWPoTcn9C+wiLjfIHECiFmjhiLBLi9oEQ/7a\nJ8xv14N77T3+gXf79NPmXpSDvB9d8rHWXKG7sTXhJYYtXV0lTXVLmgGcGFvzBYvm\n2zo1sKlbW9mUNX1iV0ZejHy8w6IGTTBLS6DkxGxZgVmHrO4IjH2mDDL1o2fb/ThE\nAaNf8CsoSW/r6K6Hn+43x919dEoNu7jLlDrwYgHz1HknMCkcA1HB46apvyU5yJkv\ngGHVHdnrwCAdYqn8t/a391kDtD9+lUg2u8UzRlfDNePByIbtZBQL8pEfhf4n0Ivr\naxfMIerzigTxKquheP7XIkQo8i94DA4C+uxmYf66Y1+ImdeTryWYWRwdrXBgBKSh\nxJZ8qLBcEDtKWRhw1Qgn9y+aielr1Wx5yO/8jNLe4hEtQGwyEGGK5+O7latpXq3u\n4gkBoRNtMdNgF26lii61GKEzrt+gd+7WExl/0pCgt+z5Id5te17V+lmF0M14/zl0\nhAv/Rw7hkgjBNoQFpUu4m91WCcut3Alme1gU8XhDwm4dAA==\n-----END CERTIFICATE-----\n'; // certificate with escaped newline characters

var body = {
  'cert': cert,
  'status': 'valid'
}

console.log(apiUrl)

request
  .post(apiUrl)
  .set(headers)
  .send(body)
  .set('Accept', 'application/json')
  .then((res) => console.log(res.body))
