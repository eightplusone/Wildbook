// server.js
// Reference: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// ====================
// BASE SETUP
// ====================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
//var swaggerUI = require('swagger-ui-express'),
//    swaggerDocument = require('./swagger.json');

// configure app to use bodyParser()
// this will let us to get the data from a POST
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

/*
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: '',
  },
  host: '34.204.0.81:3000',
  basePath: '/',
};

var swaggerOptions = { 
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(swaggerOptions);

app.get('./swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
*/

// Database
const Sequelize = require('sequelize');

// Models
var Animal = require(process.cwd() + '/models/animal');
var AnimalFoundInImage = require(process.cwd() + '/models/animal_found_in_image');
var Comment = require(process.cwd() + '/models/comment');
var Favorite = require(process.cwd() + '/models/favorite');
var FollowAnimal = require(process.cwd() + '/models/follow_animal');
var FollowUser = require(process.cwd() + '/models/follow_user');
var GroupPost = require(process.cwd() + '/models/group_post');
var Image = require(process.cwd() + '/models/image');
var ImageInPost = require(process.cwd() + '/models/image_in_post');
var Location = require(process.cwd() + '/models/location');
var Post = require(process.cwd() + '/models/post');
var User = require(process.cwd() + '/models/user');


// =====================
// ROUTES FOR OUR API
// =====================
const router = express.Router();  // get an instance of the express router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();  // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost/api)
router.get('/', function(req, res) {
  res.json({ message:'Hello World from /api!' });
});



// --------------------
// routes that end in /users
// --------------------

// Get all users
router.route('/users')
  .get(function(req, res) {
    User.findAll().then((err, out) => {
      if (err) return(res.send(err));
      res.json(out);
    });
  })


// Add a user
router.route('/users')
  .post(function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.fname = req.body.fname;
    user.lname = req.body.lname;

    user.save(function(err) {
      if (err) return(res.send(err));
      res.json({ message: 'New user created!' });
    });
  });


// Get a user by username
router.route('/users/:username')
  .get(function(req, res) {
    User.findAll({
      where: {
        username: req.params.username
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.send(out);
    });
  });


// Modify user information
router.route('/user/:username')
  .put(function(req, res) {
    User.findOne({
      where: {
        username: req.params.username
      }
    }).then( (err, user) => {
      if (err) return(res.send(err));
      
      user.username = req.body.username;
      user.password = req.body.password;
      user.fname = req.body.fname;
      user.lname = req.body.lname;

      user.save(function(err) {
        if (err) return(res.send(err));
        res.json({ message: 'User updated!' })
      });
    });
  });


// Get all posts belong to the user
router.route('/users/:username/posts')
  .get(function(req, res) {
    User.findAll({
      attributes: ['posts'],
      where: {
        username: req.params.username
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.json(out);
    });
  })


// Add a new post
/*
router.route('/users/:username/posts')
  .post(function(req, res) {
    Post.sequelize.transaction().then(function(t) {
      Post.create({
          username: req.params.username,
          location_id: req.body.location_id,
          timestamp: Sequelize.fn('NOW'),
          text: req.body.text
      }).then(function() {
        t.commit();
      }).catch(function(err) {
        res.send(err);
        t.rollback();
      })
    });
  })
*/

var fs = require('fs');
var multer = require('multer');

var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'wildbook' }
});

var multerS3 = require('multer-s3');


// Problem of AWS S3: metadata has to be in ASCII.
// It means any metadata of a photo will be removed.
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'wildbook/images',
    acl: 'public-read',
    /*metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },*/
    key: function(req, file, cb) {
      var fileExtension = file.originalname.slice((Math.max(0, file.originalname.lastIndexOf(".")) || Infinity));
      //cb(null, Date.now().toString())
      //cb(null, file.originalname);
      cb(null, Date.now().toString() + fileExtension);
    }
  })
})

router.route('/users/:username/posts')
  .post(upload.single('imagefile'), function(req, res) {
    var imageId = 0;
    var postId = 0;

    console.log("Req body", req.body);
    
    // Save image
    Image.sequelize.transaction().then(function(t) {
      Image.create({
          url: req.file.location,
          timestamp: Sequelize.fn('NOW'),
          lat: 1,
          long: 1,
          username: req.params.username,
          is_uploaded_to_ibeis: 'true'
      }).then(function(obj) {
        imageId = obj.id;
        t.commit();

        // Save post
        Post.sequelize.transaction().then(function(t) {
          Post.create({
              username: req.params.username,
              location_id: 1,
              timestamp: Sequelize.fn('NOW'),
              text: 'req.body.text'
          }).then(function(obj) {
            postId = obj.id;
            t.commit();

            // Update image in post
            ImageInPost.sequelize.transaction().then(function(t) {
              ImageInPost.create({
                image_id: imageId,
                post_id: postId
              }).then(function() {
                t.commit();
              }).catch(function(err) {
                t.rollback();
                console.log(err);
              })
            })

          }).catch(function(err) {
            t.rollback();
            console.log(err);
          })
        });

      }).catch(function(err) {
        t.rollback();
        console.log(err);
      })
    })

    
  })

// Get all locations of a user
router.route('/users/:username/locations')
  .get(function(req, res) {
    User.findAll({
      attributes: ['locations'],
      where: {
        username: req.params.username
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.json(out);
    });
  })


// Get all followers of a user
router.route('/users/:username/followers')
  .get(function(req, res) {
    User.findAll({
      attributes: ['followers'],
      where: {
        username: req.params.username
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.json(out);
    });
  })


// Get all profiles that a user is following
router.route('/users/:username/followings')
  .get(function(req, res) {
    User.findAll({
      attributes: ['following_users', 'following_animals'],
      where: {
        username: req.params.username
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.json(out);
    });
  })


// Get all posts that the user has favorited
router.route('/users/:username/favorites')
  .get(function(req, res) {
    User.findAll({
      attributes: ['favorites'],
      where: {
        username: req.params.username
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.json(out);
    });
  })


// --------------------
// routes that end in /posts
// --------------------

// Get all posts
router.route('/posts')
  .get(function(req, res) {
    Post.findAll().then((err, out) => {
      if (err) return(res.send(err));
      res.json(out);
    });
  });


// Get a post by id
router.route('/posts/:id')
  .get(function(req, res) {
    Post.findAll({
      where: {
        id: req.params.id
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.send(out);
    });
  });


// Get all images belong to a post
router.route('/posts/:id/images')
  .get(function(req, res) {
    Post.findAll({
      attributes: ['images'],
      where: {
        id: req.params.id
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.send(out);
    });
  });


// Get all animals appear in a post
router.route('/posts/:id/animals')
  .get(function(req, res) {
    Post.findAll({
      attributes: ['animals'],
      where: {
        id: req.params.id
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.send(out);
    });
  });


// Get all users who favorite a post
router.route('/posts/:id/favorites')
  .get(function(req, res) {
    Post.findAll({
      attributes: ['favorites'],
      where: {
        id: req.params.id
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.send(out);
    });
  });


// Get all comments who commented on a post
router.route('/posts/:id/comments')
  .get(function(req, res) {
    Comment.findAll({
      where: {
        post_id: req.params.id
      }
    }).then( (err, out) => {
      if (err) return(res.send(err));
      res.send(out);
    });
  });


// --------------------
// routes that end in /animals
// --------------------

// Get all animals
router.route('/animals')
  .get(function(req, res) {
    Animal.findAll().then( (err, out) => {
      if (err) res.send(err);
      res.json(out);
    });
  });


// Get the animal that matches the id
router.route('/animals/:animal_id')
  .get(function(req, res) {
    Animal.findAll({
      where: {
        id: req.params.animal_id
      }
    }).then ( (err, out) => {
      if (err) res.send(err);
      res.json(out);
   });
  });


// Get all locations of an animal
router.route('/animals/:animal_id/locations')
  .get(function(req, res) {
    Animal.findAll({
      attributes: ['locations'],
      where: {
        id: req.params.animal_id
      }
    }).then ( (err, out) => {
      if (err) res.send(err);
      res.json(out);
   });
  });


// Get all posts that an animal appears in
router.route('/animals/:animal_id/posts')
  .get(function(req, res) {
    Animal.findAll({
      attributes: ['posts'],
      where: {
        id: req.params.animal_id
      }
    }).then ( (err, out) => {
      if (err) res.send(err);
      res.json(out);
   });
  });


// --------------------
// routes that end in /images
// --------------------

// Get all images
router.route('/images')
  .get(function(req, res) {
    Image.findAll().then( (err, out) => {
      if (err) res.send(err);
      res.json(out);
    });
  });


// Get the animal that matches the id
router.route('/images/:id')
  .get(function(req, res) {
    Image.findAll({
      where: {
        id: req.params.id
      }
    }).then ( (err, out) => {
      if (err) res.send(err);
      res.json(out);
   });
  });


// Get the animal that matches the id
router.route('/images/:id/animals')
  .get(function(req, res) {
    AnimalFoundInImage.findAll({
      attributes: ['animal_id'],
      where: {
        image_id: req.params.id
      }
    }).then ( (err, out) => {
      if (err) res.send(err);
      res.json(out);
   });
  });


// --------------------
// routes that end in /locations
// --------------------

// Get all locations
router.route('/locations')
  .get(function(req, res) {
    Location.findAll().then( (err, out) => {
      if (err) res.send(err);
      res.json(out);
    });
  });


// Get a specific location
router.route('/locations/:id')
  .get(function(req, res) {
    Location.findAll({
      where: {
        id: req.params.id
      }
    }).then ( (err, out) => {
      if (err) res.send(err);
      res.json(out);
   });
  });


// Get all posts belong to a location
router.route('/locations/:id/posts')
  .get(function(req, res) {
    Post.findAll({
      attributes: ['id'],
      where: {
        location_id: req.params.id
      }
    }).then ( (err, out) => {
      if (err) res.send(err);
      res.json(out);
   });
  });



// =====================
// REGISTER OUR ROUTES 
// ====================
// all of our routes will be prefixed with /api
app.use('/api', router);

// SwaggerUI
//router.route('/api-docs', swaggerUI.server, swaggerUI.setup(swaggerDocument, swaggerOptions));

// test the homepage of the app (GET http://localhost)
app.get('/', function(req, res) {
  res.json({ message:'Hello World!' });
});

// ====================
// START THE SERVER
// ====================
app.listen(port);
console.log('Server is listening on port ' + port);

