
const express = require('express')
const bodyParser = require('body-parser')
const { join } = require('path')
const _ = require('lodash')

var execFile = require('child_process').execFile


const app = express()
const port = process.env.PAYMENT_PORT ? _.toNumber(process.env.PAYMENT_PORT) : 9001
const psdk = process.env.PSDK_APP ? process.env.PSDK_APP : "PSDK_Test"
const terminalIp = process.env.TERMINAL_IP ? process.env.TERMINAL_IP : "192.168.31.26"
require('dotenv').config()
app.use(bodyParser.json());


var server =  app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Content Provider Service listening at http://%s:%s", host, port);
})

app.get('/sendCart', function (req, res) {
    // This request comes from the html client-side
    let terminalIp = process.env.TERMINAL_IP || "192.168.31.26"
    let amount = req.query.amount;

    let taxRate = .10;
    let tax = parseInt(amount) * taxRate;
    let grandTotal = tax + parseInt(amount)
    let cart = {
            'total': amount,
            'tax': tax,
            'taxRate': taxRate,
            'grandTotal': grandTotal.toString()
        }
        
    let payload = convertValuesToStringsDeep(cart)

    console.log("Path: ", join(__dirname,psdk))
    console.log("Cart: ", JSON.stringify(payload))
    console.log("IP: ", terminalIp)
  var child = execFile(join(__dirname, psdk), [JSON.stringify(payload), terminalIp],

    function (error, stdout, stderr) {
      if(error) {
        console.log(error)
        return 
      }
      // This callback is invoked once the child terminates
      // You'd want to check err/stderr as well!
      console.log("stdout: ", stdout)
      console.log("stderr: ", stderr)
      let out = {
        'stdout': stdout,
        'stderr': stderr
      }
      res.json(out)
  });

})

function convertValuesToStringsDeep(obj) {
  return _.cloneDeepWith(obj, value => {
    return !_.isPlainObject(value) ? _.toString(value) : undefined;
  });
}

