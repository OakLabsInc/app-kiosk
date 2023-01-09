
const express = require('express');
const app = express();
const PORT = 80;
const _ = require('lodash')
const axios = require('axios')

app.use(express.static('src/public'));

app.get('/sayhello', (req, res) => {
    res.send('Hello World!');
});
app.get('/sendCart', function (req, res) {
    // This request comes from the html client-side
    let paymentPort = process.env.PAYMENT_PORT || 9001
    let paymentHost = process.env.PAYMENT_HOST || "localhost"
    let terminalIp = process.env.TERMINAL_IP || "192.168.31.26"
    let amount = req.query.amount;
    let taxRate = .10;
    let tax = amount * taxRate;
    let grandTotal = tax + amount
    let cart = {
        'total': amount,
        'tax': tax,
        'taxRate': taxRate,
        'grandTotal': grandTotal
    }

    let payload = convertValuesToStringsDeep(cart)

    console.log(JSON.stringify(payload, null, 4))
   
    axios.post(`http://${paymentHost}:${paymentPort}`, payload)
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(`statusText: ${res.statusText}`)
        console.log("payment-response: ", res)
      })
      .catch(error => {
        console.error(error)
      })
  res.json({
    message: "Object Sent to payment component",
    cart: payload
  })

    
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

function convertValuesToStringsDeep(obj) {
    return _.cloneDeepWith(obj, value => {
      return !_.isPlainObject(value) ? _.toString(value) : undefined;
    });
  }