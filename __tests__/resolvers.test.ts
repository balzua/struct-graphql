// For database operations
import { Connection } from "mongoose";
import { Employee } from '../src/employees/models';
import { Department } from '../src/departments/models';
const mongoose = require('mongoose');
const { TEST_DB_URL } = require('../src/config');

// For creating the schema
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from '../src/typeDefs';
import { merge } from 'lodash';
import { resolvers as employeeResolvers } from '../src/employees/resolvers';
import { resolvers as departmentResolvers } from '../src/departments/resolvers';

// For making queries
import { graphql } from 'graphql';

// For mock data and test cases
const { mockData, testCases } = require('./mockData');

// Create the schema to test against
const resolvers = merge(employeeResolvers, departmentResolvers);
const schema = makeExecutableSchema({ typeDefs, resolvers });

describe('Resolver tests', () => {
    // Connect to the test database prior to running all tests.
    // Start the mock GraphQL server.
    let dbConnection: Connection
    beforeAll(async () => {
        dbConnection = await mongoose.connect(TEST_DB_URL, { useNewUrlParser: true });
    })
    // Before each test, seed the database with test data.
    beforeEach(async () => {
        await Employee.insertMany(mockData.employees)
        await Department.insertMany(mockData.departments)
    })
    // After each test, clear the test data (to remove any mutated data and start fresh)
    afterEach(async () => {
        // Wait for both promises to resolve (remove all employees and remove all departments)
        Promise.all([Employee.deleteMany({}), Department.deleteMany({})]);
    })
    // Close the test database connection.
    afterAll(async () => {
        dbConnection.close();
    })
    // Run the test cases. For each test case, run a test with the test case name
    // Expect the results of the graphql query contained in the test case to equal the expected value for that test case.
    testCases.forEach((testCase: any) => {
        test(testCase.name, async () => {
            expect(await graphql(schema, testCase.query)).toEqual(testCase.expected);
        })
    })
})