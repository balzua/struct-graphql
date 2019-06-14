import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
    mockServer
} from 'graphql-tools';
import { typeDefs } from '../typeDefs';

// Constants for testing
// Schema is mocked to return TEST_ID or TEST_STRING.
const TEST_ID = '1';
const TEST_STRING = 'test'

describe('Schema', () => {
    // Mocks for different data types
    const mocks = {
        ID: () => TEST_ID,
        String: () => TEST_STRING,
        Employee: () => ({
            firstName: TEST_STRING,
            lastName: TEST_STRING,
            jobTitle: TEST_STRING,
            fullName: TEST_STRING,
            id: TEST_ID
        }),
        Department: () => ({
            name: TEST_STRING,
            id: TEST_ID
        })
    }
    const schema = makeExecutableSchema({ typeDefs });
    // Use this to add mock functions to the schema as resolvers
    addMockFunctionsToSchema({ schema, mocks });

    test('has valid type definitions', async () => {
        // Verify that a server can be started with this schema
        expect(async () => {
          const MockServer = mockServer(typeDefs, mocks);
          await MockServer.query(`{ __schema { types { name } } }`);
        }).not.toThrow();
    });
})