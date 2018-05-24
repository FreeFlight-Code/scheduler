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
    console.log(req.params.id, ' req.body on get jobs from single business');
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
    db.getSingleBusinessById(value).then((results) => {
      res.status(200).send(results);
    }).catch((error) => {
      res.status(400).send(error);
    })
  },
  //edit business
  updateBusiness: function (req, res, next) {
    let db = req.app.get('db')
    let { bid, businessname, link, logo } = req.body;
    db.updateBusiness([bid, businessname, link, logo]).then(() => {
      res.status(200).send(true);
    }).catch((error) => {
      res.status(400).send(error);
    })
  },
  // delete business
  deleteBusiness: function (req, res, next) {
    let db = req.app.get('db')
    const value = req.params.id;
    db.deleteBusiness(value).then(() => {
      res.status(200).send(true);
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
    let {businessname, link, logo} = req.body;
    db.getSingleBusinessByName([businessname]).then((result) => {
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

  //addbusinessonly 
  addBusinessOnly: function (req, res) {
    console.log(req.body, 'req-body')
    let db = req.app.get('db');
    let { businessname, link, logo } = req.body;
    db.addBusiness(
      [
        businessname,
        link,
        logo
      ]
    )
      .then(() => {
        res.status(200).send(true);
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
    let today = new Date();
    let {
      uid
      , jobdate
      , city
      , state
      , comments
      , bid
      , jobname

    } = req.body;

    console.log('add Job hit, checking body', req.body)
    db.addJob([
      uid
      , today
      , jobdate
      , city
      , state
      , comments
      , bid
      , jobname
    ]).then(() => {
      res.status(200).send(true);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
  //edit job
  updateJob: function (req, res, next) {
    let db = req.app.get('db');
    let {
      jid
      , comments
      , city
      , state
      , jobname
      , jobdate
      , bid
      , uid

    } = req.body;

    console.log('edit Job hit, checking body', req.body)
    db.updateJob([
      jid
      , comments
      , city
      , state
      , jobname
      , jobdate
      , bid
      , uid
    ]).then(() => {
      res.status(200).send(true);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
  //edit job
  deleteJob: function (req, res, next) {
    let db = req.app.get('db')
    const value = req.params.id;
    db.deleteJob(value).then(() => {
      res.status(200).send(true);
    }).catch((error) => {
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
    let {user_email, user_password, user_firstname, user_lastname, user_birthday, businessname, business_homepage_url, business_logo_url, bid } = req.body;
    console.log(req.body, 'req.body coming from frontend');
    
    //match user email in db
    db.login([user_email])
      .then((result) => {
        console.log(result, ' if [] no match to email')
        //existing user go to login
        if (result && result['0'] && result['0'].uid) {
          next();

          //is there business info?? add business
        } else if (bid === 9999) {
          console.log('bid = 9999 so moving to add business')
          db.addBusiness([businessname, business_homepage_url, business_logo_url])
            //res returns business name
            .then((result) => {
              console.log(result, 'business added with name... ' + businessname)
              // console.log(res[0], 'returned from addbusiness');
              //business id is returned
              return result;
            })

            //no match to user email and info on businessname so add user as admin on business
            .then((result) => {
              var comments = '', bid = result[0].bid, auth = 'admin';

              db.addUser([user_email, user_password, user_firstname, user_lastname, user_birthday, comments, auth, bid])
            })

            .then(() => {
              console.log(user_firstname + ' ' + user_lastname + ' ' + 'added as admin for ' + businessname);
              next();
            })

          //no match to user email and no info on businessname
        } else {
          // var bid = req.body.bid;
          let comments = '', auth = 'client';
          console.log(user_firstname + ' added as a client for '+ businessname)
          db.addUser([user_email, user_password, user_firstname, user_lastname, user_birthday, comments, auth, bid])
            .then(() => {
              console.log(user_firstname + ' ' + user_lastname + ' ' + 'added as client')
              next();
            })
        }
      }).catch((err => err))
  },

  login: function (req, res, next) {
    let { user_email, user_password, user_firstname, user_lastname, user_birthday, businessname, business_homepage_url, business_logo_url, bid } = req.body;

    console.log(req.body, 'req.body in login');

    let db = req.app.get('db')
    db.login([user_email]).then((results) => {

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
    console.log(user_email, '...email on sess auth')
    db.loginb([user_email]).then((results) => {
      console.log('no bid / email...results from login');
      req.user = results[0];
      req.user.session = req.sessionID
      console.log(req.user)
      res.status(200).send({ user: req.user, redirect: '/scheduler' })

    })
  },



}