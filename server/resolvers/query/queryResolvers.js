const authenticate = require('../authenticate')
const fetch = require("node-fetch")
const axios = require('axios');

module.exports = {
  Query: {
    async getAllUsers(parent, _, { app, req, postgres }, info) {
      authenticate(app, req)
      const findUserQuery = {
        text: 'SELECT * FROM space.users',        
      }
      const user = await postgres.query(findUserQuery)

      if (user.rows.length < 1) {
        throw 'No users'
      }
      return user.rows
    },
    async launch(parent, {id}, {app, req}, info) {
      authenticate(app, req)
      const response = await axios(`https://api.spacexdata.com/v3/launches/${id}`)
      // console.log(response.data)
      return {
        id: response.data.flight_number,
        site: response.data.launch_site.site_name,
        launchYear: response.data.launch_year
      }
    },
    async mybookings(parent, {id}, {app, req, postgres}, info){
      let userid = authenticate(app, req)
      const findUserQuery = {
        text: 'SELECT * FROM space.booklaunch where user_id = $1',
        values: [userid]        
      }
      const userBookings = await postgres.query(findUserQuery)
      const bookingspromises = await userBookings.rows.map(element =>{
        return axios.get("https://api.spacexdata.com/v3/launches/" + element.flight_no)
      })
      const resolvedbooking = await Promise.all(bookingspromises)      
      let bookingData = resolvedbooking.map(element => {
        return element.data
      })
      return bookingData;
    }
  },
}
// const response = await axios(`https://api.spacexdata.com/v3/launches/${id}`)