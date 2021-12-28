const https = require('https')
const compression = require('compression')
const express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.json())
app.use(compression())

app.get('/', function(request, response) {
  try {
    const options = {
      hostname: 't.me',
      port: 443,
      path: '/s/zalupa_history',
      method: 'POST',
      headers: {
        'Origin': 'https://t.me',
        'Referer': 'https://t.me/s/zalupa_history',
        'Host': 't.me',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15'
      }
    }

    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', data => {
        response.send({"success": true, "body": data})
      })
    })

    req.on('error', error => {
      response.send({"success": false, "message": "Input function error", "exception": error})
    })

    req.end()
  } catch (error) {
    response.send({"success": false, "error_body": {
      "message": "Global function error", "exception": error
    }})
  }
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
