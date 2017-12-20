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
      console.log('get single business, id... ' + id);
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },

  updateBusiness: function (req, res) {
    console.log(req.body, 'req.body');
    let db= req.app.get('db')
    let name = req.body.business_name;
    let redirect = req.body.redirect;
    let logourl = req.body.logo;
    db.updateBusiness([name, redirect, logourl]).then((results) => {
      console.log(results);
      res.status(200).send(results);
    }).catch((error)=>{
      console.log(error);
      res.status(400).send(error);        
  })
  },

  addBusiness: function (req, res) {
    console.log(req.body, 'req-body')
    let db= req.app.get('db');
    let businessname = req.body.businessname;
    let link = req.body.link;
    let logo = req.body.logo;
    db.getSingleBusiness([businessname]).then((result)=>{
      if(result){
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
    .catch((error)=>{
        console.log(error);
        res.status(400).send(error);        
    })
  },

  addJob: function (req, res) {
    let db= req.app.get('db')
    console.log(req.body.user, 'body.user');
    let {custId, date, city, state, comments, jobName, busId,} = req.body.user;
      console.log(custId, 'custId')
      
      db.addJob([
      custId,
      date,
      city,
      state,
      comments,
      jobName,
      busId,
       ]).then((results) => {
      console.log('Job added', results);
      res.status(200).send('Job added...');
    }).catch((error)=>{
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
      // console.log('jobs singlecustomer backend...' + results);
      res.status(200).send(results);
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  },
addUser: function (req, res, next) {
  // console.log('in adduser');

  let auth = 'client';
  let db = req.app.get('db');
  let { email, password, business_id} = req.body;
  db.login([email, password, business_id, auth]).then(res => {
  if (res[0]) {
    next();
  } 
  else
    db.adduser([email, password, business_id, auth]).then((results2) => {
      res.push(results2[0]);
  //     console.log('adduser ', res);
      res.status(200).send(res)
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
    })
  },

  login: function (req, res, next) {
    // console.log('in login');
    // let id = req.params.id;

    let db = req.app.get('db')
    let { email, password, business_id} = req.body;
    db.login(email).then((results) => {
      if (results[0].password !== password) {
        res.status(400).send('login failure');
      } else 
      if (results[0].password === password) {
      next();
  }})
},

sessionAuth: function (req, res) {
  let db = req.app.get('db')
  let { email, password, business_id} = req.body;  
  db.loginb(email).then((results) => {
    res.status(200).send({user: results[0], redirect: '/login/scheduler'})
 
})},



}