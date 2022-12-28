const oak = require('oak')
oak.catchErrors()
const express = require('express')
const stylus = require('stylus')
const bodyParser = require('body-parser')
const axios = require('axios')

const { join } = require('path')
const _ = require('lodash')

const app = express()
const port = process.env.PORT ? _.toNumber(process.env.PORT) : 80

const printer = require(join(__dirname, 'print-receipt'))
const printerName = process.env.PRINTER_NAME || "http://localhost:9631/printers/TM-T88V"

process.env.NODE_ENV = 'local'

if(process.env.NODE_ENV === 'local') {
  require('dotenv').config()
  console.log('ENV: ', process.env)
}

let publicPath = join(__dirname, 'public')


console.log('VERSIONS: ', process.versions)

// bodyParsor is required to parse incoming json
app.use(bodyParser.json());

app.use(express.static(publicPath))

app.listen(port, function () {
    oak.on('ready', () => loadWindow())
})

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/env', function(req, res) {
  let env = {...process.env}
  //console.log("ENV: ", env)
  res.json(env)
})

app.post('/sendCart', function (req, res) {
    // This request comes from the html client-side
    let paymentPort = process.env.PAYMENT_PORT || 8003
    let paymentHost = process.env.HOST || "localhost"
    let terminalIp = process.env.TERMINAL_IP || "192.168.31.26"

    let payload = convertValuesToStringsDeep(req.body)

    console.log(JSON.stringify(payload, null, 2))
   
    axios.post(`http://${paymentHost}:${paymentPort}`, payload)
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log("payment-response: ", res)
        window.send('payment-response', res)
      })
      .catch(error => {
        console.error(error)
      })
  res.json({
    message: "Object Sent to payment component",
    cart: payload
  })

    
})

app.post('/printer-attributes', async function(req, res) {
  let printers = await printer.getPrinterAttributes(printerName, function(name, ppd){
    res.json({
      message: "Sent To Printer",
      data: {
        ppd: ppd,
        name: name
      }
    })
  })
})

app.post('/print-receipt', async function(req, res) {
  console.log("Print request", req.body)
  req.body.service = req.body
  
  let receipt = await printer.printReceipt(printerName, req.body, function(data){
    window.send('print-response', {
      message: "Receipt Sent To Printer",
      data: data
    })
  })
  
})

async function loadWindow () {
    console.log({
      message: `Started on port ${port}`
    })
    let displays = oak.getDisplays()
    let display = parseInt(process.env.DISPLAY_ID) || 0
    let width = displays[display].workArea.width
    let height = displays[display].workArea.height
    let size = width + 'x' + height
    let x = displays[display].workArea.x
    let y = displays[display].workArea.y
    console.log(JSON.stringify(displays,null,2))
    window = oak.load({
      // url: remoteUrl,
      url: `http://localhost:${port}/`,
      ontop: false,
      size: size,
      x: x,
      y: y,
      insecure: true,
      flags: ['enable-vp8-alpha-playback'],
      sslExceptions: ['localhost','*.googleapis.com'],
      background: '#ffffff',

      scripts: [
        {
          name: 'lodash',
          path: 'lodash'
        },
        {
          name: 'uuid',
          path: 'uuid'
        }
      ]
    })



  }

  function convertValuesToStringsDeep(obj) {
    return _.cloneDeepWith(obj, value => {
      return !_.isPlainObject(value) ? _.toString(value) : undefined;
    });
  }