

require('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      session = require('express-session');
const massive = require('massive');
// var profile = sessionStorage;

const app = express();


//~~~~~~~~~~~~~~~~~~~~~~~~~~~    MIDDLEWARE     ~~~~~~~~~~~~~~~~~~
app.use(cors());
app.use(bodyParser.json());


//~~~~~~~~~~~~~    Controllers     ~~~~~~~~~~~~~~~~~~~~~~~~~

// const Businesses = require('./server/Businesses');
const api = require('./server/api.js');

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ENDPOINTS  SAMPLES

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// app.use(api.createDatabase);

app.get('/api/businesses', api.getBusinesses);
app.get('/api/singleBusiness/:id', api.getSingleBusiness);
app.post('/api/addBusiness', api.addBusiness);

app.get('/api/jobs', api.getJobs);
app.get('/api/job/:id', api.getSingleJob);
app.get('/api/jobsSingleCustomer/:id', api.getJobsSingleCustomer);
// app.post('/api/addjob', api.addJob);


///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Massive~~~~~~~~~`


massive({
    host: process.env.MASSIVE_HOST,
    port: process.env.MASSIVE_PORT,
    database: process.env.MASSIVE_DATABASE,
    user: process.env.MASSIVE_USER,
    password: process.env.MASSIVE_PASSWORD,
    ssl: true
  }).then(function(db) {
    app.set('db', db);
  });


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
AUTH0 LOGIN
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//                        middleware
app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
  }, function(accessToken, refreshToken, extraParams, profile, done) {

  //  console.log(profile);

   done(null, profile);

}));




//     ~~~~~~~~~~ MY  AUTH endpoints    ~~~~~~~~
//kicks off process
app.get('/auth', passport.authenticate('auth0'));

app.post('/client_auth', api.login);
app.post('/login/:id',
    api.addUser,
    api.login,
    api.sessionAuth
);

app.get('/sessionAuth', api.sessionAuth);


//redirects
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/scheduler',
    failureRedirect: 'http://localhost:3000/login'
    }))

passport.serializeUser(function(user, done) {
    done(null, user);
});


// passport.deserializeUser(function(id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
passport.deserializeUser(function(obj, done) {
    done(null, obj)
});

//to help stay logged in between pages or routes
app.get('/auth/me', (req, res, next) => {
    console.log(req.user)
    if (!req.user) {
      return res.status(404).send('User not found');
    } else {
      return res.status(200).send(req.user);
    }
  })
  
 app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect(302, 'http://localhost:3000/');
  })

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
LISTEN
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const PORT = 3030;
app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    })