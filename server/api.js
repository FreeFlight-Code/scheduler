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

  getSingleBusiness: function (req, res) {
    let db = req.app.get('db')
    const value = req.params.id;
    db.getSingleBusiness([value]).then((results) => {
      console.log('get single business, id... ' + value);
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },


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
  getJobsSingleCustomer: function (req, res) {
    let db = req.app.get('db')
    const value = req.params.id;
    db.getJobsSingleCustomer([value]).then((results) => {
      console.log('jobs singlecustomer backend...' + results);
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
  addUser: function (req, res, next) {
    // let auth = 'client';
    let db = req.app.get('db');
    let { user_email, user_password, user_firstname, user_lastname, user_birthday, businessname, business_homepage_url, business_logo_url } = req.body;
    console.log('entered addUser');
    // console.log(req.body, 'req.body coming from frontend');

    db.login([user_email])
      .then((res) => {
        //existing user go to login
        console.log(res && res['0'] && res['0'].uid, 'is there a user id')
        if (res && res['0'] && res['0'].uid) {
          next();
          //no user add business then user
        } else if (businessname) {
          // console.log(businessname, 'business information sent from frontend')
          db.addBusiness([businessname, business_homepage_url, business_logo_url])
            //res returns business name
            .then((res) => {
              console.log(res, 'business added with name... ' + businessname)
              // console.log(res[0], 'returned from addbusiness');
              //business id is returned
              return res;
            })
            
            //no match to user email and info on businessname
            .then((res) => {
              console.log(res)
              var comments = '', bid = 1, auth = 'admin';
              
                        db.addUser([user_email, user_password, user_firstname, user_lastname, user_birthday, comments, auth, bid])
            })

            .then(() => console.log(user_firstname + ' ' + user_lastname + ' ' + 'added as admin for' + businessname))

            //no match to user email and no info on businessname
        } else {
          var bid = req.params.id;
          var comments = '', auth = 'client';

          db.addUser([user_email, user_password, user_firstname, user_lastname, user_birthday, comments, auth, bid])
            .then(() => console.log(user_firstname + ' ' + user_lastname + ' ' + 'added as client'))
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
    // db.login(user_email).then((res)=>console.log('results'))
    db.login([user_email]).then((results) => {
      console.log(results, 'results from sql login request');
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
    db.loginb(user_email).then((results) => {
      console.log(results, 'results from login')
      res.status(200).send({ user: results[0], redirect: '/scheduler' })

    })
  },



}