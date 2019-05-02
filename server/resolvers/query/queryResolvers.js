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
    }
  },
}
