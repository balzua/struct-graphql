import mongoose from 'mongoose';
const { ApolloServer, gql } = require('apollo-server');
const { MONGO_URL } = require('./config');
import { merge } from 'lodash';
import { resolvers as employeeResolvers } from './employees/resolvers';
import { resolvers as departmentResolvers } from './departments/resolvers';
import { typeDef as EmployeeType } from './employees/models';
import { typeDef as DepartmentType } from './departments/models';

const QueryType = gql`
  type Query {
    employees: [Employee]
    employeeById(id: ID!): Employee
    departments: [Department]
    departmentById(id: ID!): Department
  }
  type Mutation {
    updateEmployeeById(id: ID!, firstName: String, lastName: String, department: ID, manager: ID): Employee
  }
`;

// Connect to the database. Config file provides the URL either through an environment variable or default to localhost
async function dbConnect() {
  try { 
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    console.log(`Connected to DB at ${MONGO_URL}`);
  } catch (err) {
    console.log(err);
  }
}

// Merge resolvers using lodash merge
const resolvers = merge(employeeResolvers, departmentResolvers);

// Create new apollo-server, connect to the database, and listen on port 4000 (default for Apollo Server)
const server = new ApolloServer({ typeDefs: [QueryType, EmployeeType, DepartmentType], resolvers });
dbConnect();
server.listen().then(({ url }: any) => {
    console.log(`The server is now running at: ${url}`);
});
