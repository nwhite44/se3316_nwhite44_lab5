// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://user:se3316@ds155268.mlab.com:55268/lab5';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Product = require('./models/product.model');
const Users = require('./models/users.model');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let port = 8081;

app.use('/home', express.static('display'));

var router = express.Router();

router.use(function(req, res, next) {
    
    next();
    
});

//Test route
router.get('/', function(req, res) {
    res.json({ message: 'It works!' });   
});



router.route('/create/product')

.post(function(req, res) {

              
        var product = new Product();
         product.name = req.body.name;  
         product.price = req.body.price;  
         product.quantity = req.body.quantity;
       
    
        
        product.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Item created!' });
        });
    })
    
    //get function
    .get(function(req, res) {
        Product.find(function(err, product) {
            Product.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(product);
        });

    });



router.route('/access/product/:product_id')

    
    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if (err){
                res.send(err);
            }
            res.json(product);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Product.findById(req.params.product_id, function(err, product) {

            if (err){
                 res.send(err);
            }
           product.name = req.body.name;  // update the bears info
           product.price = req.body.price;  
           product.quantity = req.body.quantity;
           product.tax = req.body.tax;
       

            // save the bear
            product.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'item updated!' });
            });

        });
    })
 
    .delete(function(req, res) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, product) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/create/user')

.post(function(req, res) {

              
        var users = new Users();
         users.email = req.body.email;  
         users.accessLevel = req.body.accessLevel;  
       
    
        
        users.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Item created!' });
        });
    })
    
    //get function
    .get(function(req, res) {
        Users.find(function(err, users) {
            Users.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(users);
        });

    });

app.use('/api', router);


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
