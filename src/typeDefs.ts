import { typeDef as EmployeeType } from './employees/models';
import { typeDef as DepartmentType } from './departments/models';

const QueryType = `
  type Query {
    employees: [Employee]
    employeeById(id: ID!): Employee
    employeeSearch(searchTerm: String!): [Employee]
    departments: [Department]
    departmentById(id: ID!): Department
  }`;
const MutationType = `
  type Mutation {
    updateEmployeeById(id: ID!, firstName: String, lastName: String, jobTitle: String, department: ID, manager: ID): Employee
  }`;

// Merge type definitions into single array & export
export const typeDefs = [QueryType, MutationType, EmployeeType, DepartmentType];