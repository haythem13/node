const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/learnDb', (err, client) => {
        if (err) return console.log(err);
        console.log('connection OKKKK ')
        let db = client.db('learnDb');
        closure(db);

    })
}
router.get('/courses', function (req, res) {
    connection ( db => {
      db.collection('Courses').find().toArray( (err,result)=> {
        res.send(result);
      })
    } )
    
  })
  
  router.get('/courses/:id' , function (req, res) {
    let qry = {_id:ObjectID(req.params.id)};
    connection ( db => {
        
      db.collection('Courses').findOne(qry).then(result=> {
        res.send(result);
      })
    } )
    
  })
  
  router.get('/courses/:id/comments' , function (req, res) {
    let qry = {_id:ObjectID(req.params.id)};
    connection ( db => {
        
      db.collection('Courses').findOne(qry).then (result=> {
        res.send(result.Comments)
      })
    } )
    
  })
  
  router.post('/courses' , function (req, res) {
    
    connection ( db => {
        
      db.collection('Courses').insert(req.body).then (result=> {
        res.redirect('http://localhost:3000/Api/courses')
        console.log(req.body +' success')
      })
    } )
    
  })
  
  router.put('/courses/:id/comments' , function (req, res) {
    let qry = {_id:ObjectID(req.params.id)};
    connection ( db => {
      db.collection('Courses').update(qry,{$push:{"Comments" :req.body}}).then (result=> {
       
        res.send(result)  
              console.log(req.body +' success')
      })
    } )
    
  })
  
  router.post('/cont', function (req, res) {
      console.log('Mr. '+req.body.name+' votre age est : '+req.body.age);
      res.send('Mr. '+req.body.name+' votre age est : '+req.body.age);
    })
  
    router.post('/login', function (req, res) {
        console.log(req.body.password);
        if(req.body.password === "123"){
            res.send({message : 'welcome '+req.body.login});
           // res.json({"message": "welcome "+req.body.login});
        }else{
          res.send({message : 'Nooooo mr '});
          //res.json({"message": "Nooo"});
        }
  
  
      
    })

module.exports = router;



