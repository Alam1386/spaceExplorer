const { gql } = require('apollo-server-express')

module.exports = gql`
scalar Date
type Query {
  getAllUsers: [User],
  user(id: ID): User,
  launches: [Launch]!,
  launch(id: ID!): Launch,
  mybookings: [Launch]
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
  flight_number: Int
  site: String
  launch_year: String
  mission_name: String
  mission(size: PatchSize): Mission
  rocket: Rocket
}

type Mutation{
  signUp(input: signupInput!): signupResponse!,
  login(input: loginInput!): loginResponse!,
  booklaunch(id: ID): launchUpdateResponse
}
type launchUpdateResponse {
  message: String
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
input launchInput{
  user_id: Int,
  flight_no: Int,
  flight_name: String,
  passenger_name: String,
  price: Int,
  departure_date: Date,
  destination: String
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

