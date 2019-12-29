import { Router } from 'express';
var router = Router();
import { MongoClient } from 'mongodb';
import { equal } from 'assert';

const url = 'mongodb://localhost:27017';
const dbName = 'myproj'

/* GET users listing. */
router.get('/', function(req, res, next) {
  const client = new MongoClient(url);
  client.connect(function(err){
    equal(null, err);
    const db = client.db(dbName);
db.collection('users').find().toArray(function(err,docs){
      res.send(docs);
      client.close();
    });
  })
});

router.post('/', function(req, res, next) {
  const client = new MongoClient(url);  
  client.connect(function(err){
    equal(null, err);
    const db = client.db(dbName);
    db.collection('users').insertOne(req.body, (err,docs) => {
      equal(null, err);
      res.send(docs);
      client.close();
    });
  });
});
export default router;
