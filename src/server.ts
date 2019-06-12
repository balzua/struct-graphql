import mongoose from 'mongoose';
const { ApolloServer, gql } = require('apollo-server');
const { MONGO_URL } = require('./config');
import { merge } from 'lodash';
import { resolvers as employeeResolvers } from './employees/resolvers';
import { resolvers as departmentResolvers } from './departments/resolvers';

const typeDefs = gql`
  type Employee {
    firstName: String
    lastName: String
    jobTitle: String
    department: Department
    manager: Employee
  }
  type Department {
      employees: [Employee]
      name: String
      id: ID
  }
  type Query {
    employees: [Employee]
    employeeById(id: ID!): Employee
    departments: [Department]
    departmentById(id: ID!): Department
  }
`;

async function dbConnect() {
  try { 
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    console.log(`Connected to DB at ${MONGO_URL}`);
  } catch (err) {
    console.log(err);
  }
}

const resolvers = merge(employeeResolvers, departmentResolvers);

const server = new ApolloServer({ typeDefs, resolvers });
dbConnect();


server.listen().then(({ url }: any) => {
    console.log(`The server is now running at: ${url}`);
});
