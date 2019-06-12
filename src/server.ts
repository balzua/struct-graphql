import mongoose from 'mongoose';
const { ApolloServer, gql } = require('apollo-server');
const { MONGO_URL } = require('./config');
import { Employee, Department } from './models';

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
    employee(id: ID!): Employee
    departments: [Department]
    department(id: ID!): Department
  }
`;

const resolvers = {
  Query: {
    employees: async () => {
      return Employee.find({})
    },
    employee: async (root: any, { id }: any) => await Employee.findOne({ id }),
    departments: () => Department.find(),
    department: (root: any, { id }: any) => Department.findOne({ id })
  }
};

async function dbConnect() {
  try { 
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    console.log(`Connected to DB at ${MONGO_URL}`);
  } catch (err) {
    console.log(err);
  }
}

const server = new ApolloServer({ typeDefs, resolvers });
dbConnect();


server.listen().then(({ url }: any) => {
    console.log(`The server is now running at: ${url}`);
});
