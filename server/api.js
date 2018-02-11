// import {profile} from '../server.js';
module.exports = {

  //~~~~~~~~~~~~~~~~~~~~~~  QUERIES  ~~~~~~~~~~~~~~~~~~~~~


  // createDatabase: function (req, res) {
  //   let db = req.app.get('db')
  //   db.createDatabase().then((results) => {
  //     console.log(results);
  //     res.status(200);
  //   }).catch((error) => {
  //     console.log(error);
  //     res.status(400).send(error);
  //   })
  // },

  //simple test api
  test: function (req, res) {
    console.log('test hit');
    res.status(200).send('test success');
  },


  //get all businesses
  getBusinesses: function (req, res) {
    let db = req.app.get('db')
    db.getBusinesses().then((results) => {
      console.log('retrieved all businesses');
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
  //get all jobs for one business
  getJobsSingleBusiness: function (req, res) {
    let db = req.app.get('db')
    // console.log(req.body, ' req.body on get jobs from single business');
    const value = req.params.id;
    db.getJobsSingleBusiness([value]).then((results) => {
      console.log('jobs single business from db... ' + results);
      // res.status(200).send('hit jobs for single business');
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },

//get one business by id
  getSingleBusinessById: function (req, res, next) {
    let db = req.app.get('db')
    const value = req.params.id;
    console.log(db, value, 'id....')
    db.getSingleBusinessById(value).then((results) => {
      res.status(200).send(results);
    }).catch((error) => {
      res.status(400).send(error);
    })
  },
  //get one business by name
  getSingleBusinessByName: function (req, res, next) {
    let db = req.app.get('db')
    const value = req.params.name;
    db.getSingleBusinessByName(value).then((results) => {
      console.log('get single business, name... ' + value);
      res.status(200).send(results);
    }).catch((error) => {
      // console.log(error);
      res.status(400).send(error);
    })
  },
//add business
  addBusiness: function (req, res) {
    console.log(req.body, 'req-body')
    let db = req.app.get('db');
    let businessname = req.body.businessname;
    let link = req.body.link;
    let logo = req.body.logo;
    db.getSingleBusiness([businessname]).then((result) => {
      if (result) {
        res.status(400).send('business name already in database')
      }
    })
    db.addBusiness(
      [
        businessname,
        link,
        logo
      ]
    )
      .then((res) => {
        //   console.log(results, 'results from database');
        res.status(200).send(res);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      })
  },
//get all jobs
  getJobs: function (req, res) {
    // console.log(req.app.get, 'req in getjobs')
    let db = req.app.get('db')
    db.getJobs().then((results) => {
      console.log(results)
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
//get one job
  getSingleJob: function (req, res) {
    let db = req.app.get('db')
    const value = req.params.id;
    db.getSingleJob([value]).then((results) => {
      console.log(results);
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
  
//add job
  addJob: function (req, res, next) {
    let db = req.app.get('db');
    let {
      businessname
      , uid
      , firstname
      , lastname
      , jobname
      , jobdate
      , city
      , state
      , comments
      , bid
    } = req.body;

    let today = new Date();

    console.log('add Job hit, checking body', req.body)
    db.addJob([
      businessname
      ,  uid
      , firstname
      , lastname
      , today
      , jobdate
      , city
      , state
      , comments
      , jobname
      , bid
    ]).then((results) => {
      // console.log('jobs singlecustomer backend...' + results);
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
//get all jobs for one user id
  getJobsSingleCustomer: function (req, res) {
    let db = req.app.get('db')
    const value = req.params.id;
    db.getJobsSingleCustomer([value]).then((results) => {
      // console.log('jobs singlecustomer backend...' + results);
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
  //add user
  addUser: function (req, res, next) {
    console.log('entered addUser');
    let db = req.app.get('db');
    let { user_email, user_password, user_firstname, user_lastname, user_birthday, businessname, business_homepage_url, business_logo_url } = req.body;
    // console.log(req.body, 'req.body coming from frontend');
    let bid = req.body.bid;
    let { addBusiness } = req.body
    //is user email in db?
    db.login([user_email])
      .then((res) => {

        //existing user go to login
        if (res && res['0'] && res['0'].uid) {
          next();

          //is there business info?? add business
        } else if (addBusiness) {
          // console.log(businessname, 'business information sent from frontend')
          db.addBusiness([businessname, business_homepage_url, business_logo_url])
            //res returns business name
            .then((res) => {
              console.log(res, 'business added with name... ' + businessname)
              // console.log(res[0], 'returned from addbusiness');
              //business id is returned
              return res;
            })
            
            //no match to user email and info on businessname so add user as admin on business
            .then((res) => {
              console.log(res[0].bid, 'res from add business');
              var comments = '', bid = res[0].bid, auth = 'admin';
              
                        db.addUser([user_email, user_password, user_firstname, user_lastname, user_birthday, comments, auth, bid])
            })

            .then(() => {console.log(user_firstname + ' ' + user_lastname + ' ' + 'added as admin for ' + businessname);
            next();
            })

            //no match to user email and no info on businessname
        } else {
          // var bid = req.body.bid;
          let comments = '', auth = 'client';

          db.addUser([user_email, user_password, user_firstname, user_lastname, user_birthday, comments, auth, bid])
            .then(() => {console.log(user_firstname + ' ' + user_lastname + ' ' + 'added as client')
          next();
          })
        }
      }).catch((err => err))
  },

  login: function (req, res, next) {
    let { user_email, user_password, user_firstname, user_lastname, user_birthday, businessname, business_homepage_url, business_logo_url } = req.body;
    let id;
    // console.log(req.body, 'req.body in login');
    if (req.params.id) {
      id = req.params.id;
    }
    let db = req.app.get('db')
    db.login([user_email]).then((results) => {
      // console.log(results, 'results from sql login request');
      if (results['0'].password !== user_password) {
        res.status(400).send('login failure');
      } else
        if (results['0'].password === user_password) {
          next();
        }
    }
    ).catch(err => err)
  },

  sessionAuth: function (req, res) {
    console.log('session auth entered')
    let db = req.app.get('db')
    let { user_email, user_password } = req.body;
    // console.log(user_email, 'req body on sess auth')
    db.loginb([user_email]).then((results) => {
      // console.log(results[0], 'results from login');
      req.user = results[0];
      req.user.session = req.sessionID
      console.log(req.user)
      res.status(200).send({ user: req.user, redirect: '/scheduler' })

    })
  },



}