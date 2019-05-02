const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')
const axios = require('axios')
module.exports = {
  Mutation: {
    async signUp( parent, {input}, { req, app, postgres }){
      console.log('show me input ', input);
      let email = input.email.toLowerCase();
      let hashedpassword = await bcrypt.hash(input.password, saltRounds)
      const newUserInsert = {
        text: "INSERT INTO space.users (first_name, last_name, email, password, country, age, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
        values: [input.first_name, input.last_name, email, hashedpassword, input.country, input.age, input.gender]
      }
      let insertNewUserResult = await postgres.query(newUserInsert)
     //console.log('Show new ', insertNewUserResult)
      let myjwttoken = await jwt.sign({
        data: insertNewUserResult.rows[0],
        exp: Math.floor(Date.now() / 1000) + (60 * 60),

      }, 'secret');
      req.res.cookie('space_app', myjwttoken, {
        httpOnly: true,
        secure: process.env.NODe_ENV === 'production'
      })
      return{
        token: hashedpassword,
        message: 'sucess'
      }
    },
    async login ( parent, {input}, {req, app, postgres}){
      const getPassword = {
        text: "SELECT  password FROM space.users  where email = $1",
        values: [input.email]
      }
      //console.log(getPassword)
      let matchPassword = await postgres.query(getPassword);
      console.log('Input', input)
      console.log(matchPassword)
      const pass = matchPassword.rows[0].password;
      let comparePassword = await bcrypt.compare (input.password, pass)
        if(comparePassword === true){
          return{
            message: 'You are logged in!'
          }
        } else{
          return {
            message: 'You are not logged in!'
          }
        }
    },
    async booklaunch(parent, input, {req, app, postgres}){
      let userid = authenticate(app, req)
      console.log("The user id: ===============/n", userid)
      // console.log("parent id", parent, input)
      const flightId = await axios(`https://api.spacexdata.com/v3/launches/${input.id}`)
      // console.log("parent id is:", flightId)
      // console.log(" Flight number is: ", flightId.data.flight_number)
      const insertId = {
        text: "INSERT INTO space.booklaunch (user_id, flight_no) VALUES ($1, $2) RETURNING *",
        values: [userid, flightId.data.flight_number]
      }
      let insertedValues  = await postgres.query(insertId);
      // console.log("The inserted values are: ", insertedValues);
      return{
        message: `The flight ID is: ${flightId.data.flight_number} AND Flight name is: ${flightId.data.rocket.rocket_name}`
      }
    }
  },
}



