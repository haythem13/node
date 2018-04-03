var express = require('express')
var bodyParser = require('body-parser')
var app = express()

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('Hello World ')
})

app.post('/cont', function (req, res) {
    console.log('Mr. '+req.body.name+' votre age est : '+req.body.age);
    res.send('Mr. '+req.body.name+' votre age est : '+req.body.age);
  })

  app.post('/login', function (req, res) {
      console.log(req.body.password);
      if(req.body.password === "123"){
          res.send({message : 'welcome '+req.body.login});
         // res.json({"message": "welcome "+req.body.login});
      }else{
        res.send({message : 'Nooooo mr '});
        //res.json({"message": "Nooo"});
      }


    
  })
 
app.listen(3000)