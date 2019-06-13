import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
    mockServer
} from 'graphql-tools';
import { graphql } from 'graphql';
import { typeDefs } from './typeDefs';

// Constants for testing
// Schema is mocked to return TEST_ID or TEST_STRING.
// TEST_EMPLOYEE_FULL_NAME and TEST_STRING used as short hand when constructing objects for "expected" objects returned from queries.
const TEST_ID = '1';
const TEST_STRING = 'test'
const TEST_EMPLOYEE_FULL_NAME = {
    fullName: TEST_STRING
}
const TEST_DEPARTMENT = {
    name: TEST_STRING,
    id: TEST_ID
}

// Array of test cases.
// Each test case should test a different shape query, verifies whether the response has the correct structure based on mocks.
const testCases = [
    { id: 'Case 1: Employee names',
    query: `
      query {
        employees {
           fullName
        }
      }
    `,
    expected: { 
        data: {
            employees: [TEST_EMPLOYEE_FULL_NAME, TEST_EMPLOYEE_FULL_NAME]
        }
    } },
    { id: 'Case 2: Departments',
    query: `
      query {
        departments {
           name
           id
        }
      }
    `,
    expected: { 
        data: {
            departments: [TEST_DEPARTMENT, TEST_DEPARTMENT]
        }
    } },
    { id: 'Case 3: Employee Departments',
    query: `
      query {
        employees {
           department {
               name
               id
           }
        }
      }
    `,
    expected: { 
        data: {
            employees: [{
                department: TEST_DEPARTMENT
            },
            {
                department: TEST_DEPARTMENT
            }]
        }
    } },
    { id: 'Case 4: Single employee sub-fields',
    query: `
      query {
        employeeById(id:"1") {
            firstName
            lastName
            jobTitle
            id
        }
      }
    `,
    expected: { 
        data: {
            employeeById: {
                firstName: TEST_STRING,
                lastName: TEST_STRING,
                jobTitle: TEST_STRING,
                id: TEST_ID
            }
        }
    } },
    { id: 'Case 5: Employee manager',
    query: `
      query {
        employeeById(id:"1") {
           manager {
               fullName
           }
        }
      }
    `,
    expected: { 
        data: {
            employeeById: {
                manager: TEST_EMPLOYEE_FULL_NAME
            },
        }
    } }
];

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

    testCases.forEach(testCase => {
        test (`${testCase.id}`, async () => {
            return await expect(
                // Make the query defined in this test case and check that it resolves to the object expected by this test case.
                graphql(schema, testCase.query, null)
              ).resolves.toEqual(testCase.expected);
        });
    })

})