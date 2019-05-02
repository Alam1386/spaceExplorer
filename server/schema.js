const { gql } = require('apollo-server-express')

module.exports = gql`
scalar Int
type Query {
  getAllUsers: [User],
  user(id: ID): User,
  launches: [Launch]!,
  launch(id: ID!): Launch
}
type User {
    id: ID!,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    country: String,
    age: Int,
    gender: String
  }
type Launch {
  id: ID!
  site: String
  launchYear: String
  mission(size: PatchSize): Mission
  rocket: Rocket
}

type Mutation{
  signUp(input: signupInput!): signupResponse!,
  login(input: loginInput!): loginResponse!,
  bookTrips(launchIds: [ID]!): TripUpdateResponse!
}
type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}
type Rocket {
  id: ID!
  name: String
  type: String
}
type Mission {
  name: String
  missionPatch: String
}
enum PatchSize {
  SMALL
  LARGE
}
input signupInput{
  first_name: String,
  last_name: String,
  email: String!,
  password: String!,
  country: String,
  age: Int,
  gender: String
}
input loginInput {
  email: String!,
  password: String!
}
type signupResponse {
  message: String
}
type loginResponse {
  message: String
}
`

