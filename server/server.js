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
const Comment = require('./models/comment.model');
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
         product.desc = req.body.desc;
         product.quantity = req.body.quantity;
         product.views = 0;
       
    
        
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

       
        Product.findById(req.params.product_id, function(err, product) {

            if (err){
                 res.send(err);
            }
            
            console.log(product);
            
           product.name = req.body.name;  
           product.price = req.body.price;  
           product.quantity = req.body.quantity;
           product.desc = req.body.desc;
         
       

          
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


router.route('/create/comment')

.post(function(req, res) {

              
        var comment = new Comment();
        
         comment.email = req.body.email;  
         comment.content = req.body.content; 
         comment.rating = req.body.rating;
         comment.hidden = false;
         comment.item_id = req.body.item_id;
       
    
        
        comment.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Item created!' });
        });
    })
    
    //get function
    .get(function(req, res) {
        Comment.find(function(err, users) {
            Comment.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(users);
        });

    });
    
router.route('/access/comment/:comment_id')

    
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err){
                res.send(err);
            }
            res.json(comment);
        });
    })

    .put(function(req, res) {

       
        Product.findById(req.params.product_id, function(err, comment) {

            if (err){
                 res.send(err);
            }
            
            console.log(comment);
            
           comment.hidden = req.body.hidden;  
         
         
       

          
            comment.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'item updated!' });
            });

        });
    })
 
    .delete(function(req, res) {
        Comment.remove({
            _id: req.params.comment_id
        }, function(err, comment) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
