const queryResolvers = require('./resolvers/query/queryResolvers')
const mutationResolvers = require('./resolvers/mutation/mutationResolvers')
const launchResolvers = require('./resolvers/launch/launchResolvers')



module.exports = () => {
  return {
    ...queryResolvers,
    ...mutationResolvers,
    ...launchResolvers,
    /* More resolvers TODO */
  }
}
