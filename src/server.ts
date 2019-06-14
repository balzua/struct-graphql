import mongoose from 'mongoose';
const { ApolloServer } = require('apollo-server');
const { MONGO_URL } = require('./config');
import { merge } from 'lodash';
import { resolvers as employeeResolvers } from './employees/resolvers';
import { resolvers as departmentResolvers } from './departments/resolvers';
import { typeDefs } from './typeDefs';

// Connect to the database. Config file provides the URL either through an environment variable or default to localhost
async function dbConnect() {
  try { 
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    console.log(`Connected to DB at ${MONGO_URL}`);
  } catch (err) {
    console.log(err);
  }
}

// Merge resolvers using lodash merge - export them for use in tests
export const resolvers = merge(employeeResolvers, departmentResolvers);

// Create new apollo-server, connect to the database, and listen on port 4000 (default for Apollo Server)
export const server = new ApolloServer({ typeDefs, resolvers });
dbConnect();
server.listen().then(({ url }: any) => {
    console.log(`The server is now running at: ${url}`);
});
