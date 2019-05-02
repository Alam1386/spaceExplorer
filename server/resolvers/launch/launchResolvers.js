const authenticate = require('../authenticate')
const axios = require('axios');

module.exports = {
  Launch: {
    async mission(parent, input, {app, req}, info) {
      // console.log('show parent mission patc ', parent)
      // console.log('show input ', input)
      // console.log('parent id:', parent.id)
      const apiResponse = await axios(`https://api.spacexdata.com/v3/launches/${parent.id}`)
      // console.log('api info:', apiResponse.data)
      let missionPatchSize
      if (input.size === 'SMALL') {
        missionPatchSize = apiResponse.data.links.mission_patch_small
      } else if (input.size === 'LARGE') {
        missionPatchSize= apiResponse.data.links.mission_patch
      }
      // console.log(" Mission name is: ", apiResponse.data.mission_name)
      return{
        name: apiResponse.data.mission_name,
        missionPatch: missionPatchSize
      }
    },
    async rocket(parent, __, {app, req}, info) {
      console.log(parent)
      const response = await axios(`https://api.spacexdata.com/v3/launches/${parent.id}`)
      //console.log(response.data)
      return {
        id: response.data.rocket.rocket_id,
        name: response.data.rocket.rocket_name,
        type: response.data.rocket.rocket_type
      }
    }, 
  },
}