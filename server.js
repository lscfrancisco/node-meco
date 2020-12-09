require('./server/config');
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51HuLPVDfFvubV9xFlystLORpY6vqWp4a7qup5wfLNjpLNgCDRY2o5nSFH5dmMsAYYItb9FvMLchveTQZoXJp3rH500cqJcK1jx");
const express= require("express");
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use( cors ({ origin: true, credentials: true }));

router.post('/prueba-pago', function( request, response ){

  const pago = {
    stripetoken: request.body.stripetoken,
    amount: request.body.amount || 15000
  };

  var charge =  stripe.paymentIntents.create({
    amount: pago.amount,
    currency: 'mxn',
    description: 'sample transaction',
    source: pago.stripetoken
  }, function (err, charge){
    if( err )
      console.log( err )
    else 
    response.send({ succes: true });
  })
 
});

router.get('/prueba', ( request, response ) => {
  
  response.json({
    ok: true,
    mensaje: 'todo funciona bien'
  });

});

router.post('/crear', ( request, response ) => {
  
  const pago = {
    stripetoken: request.body.stripetoken,
    amount: request.body.amount||15000
  };

  console.log( pago );

  var charge =  stripe.paymentIntents.create({
    amount: pago.amount,
    currency: 'mxn',
    description: 'sample transaction',
    source: pago.stripetoken
  }, function (err, charge){
    if( err )
      console.log( err )
    else 
   // response.send({ succes: true });

   response.json({
    ok: true,
    mensaje: 'todo funciona bien',
    pago
  });
  
  })

 

});



/*const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

/*app.post("/create-payment-intent", async (req, res) => {
  // const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  var stripetoken = request.body.stripetoken;
  var amountpayable = request.body.amount;

  const paymentIntent = await stripe.paymentIntents.create({
    //amount: calculateOrderAmount(items),
    amount: amountpayable,
    currency: "mxn",
    description: 'Sample transaction',
    source: stripetoken
  }, function ( err, charge ) {

    if( err )
    console.log( err );
    else {
      console.log('Creado con exito ' + charge );
      response.send({ succes: true });
    }
  });
  

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});*/


app.use(router);
app.listen(process.env.PORT, () => console.log('Node server listening on port:', process.env.PORT));
