import * as mongoose from 'mongoose';
const { ApolloServer, gql } = require('apollo-server');
const { MONGO_URL } = require('./config');

const employees = [
    {
        "id": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d",
        "firstName": "Asia",
        "lastName": "Streich",
        "jobTitle": "Dynamic Branding Orchestrator",
        "departmentId": "aef293ee-8dcc-4d89-99cf-1b8f61bab07b",
        "managerId": "2798c35b-5b8f-4a5d-9858-0a818d48cbef"
      },
      {
        "id": "24341d42-8235-47a1-9ec5-c6afcbdcef16",
        "firstName": "Ofelia",
        "lastName": "Buckridge",
        "jobTitle": "Direct Applications Architect",
        "departmentId": "cfd90465-28fa-4b9a-be3e-ef2517e987e9",
        "managerId": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d"
      },
];

const departments = [
    { "name": "Engineering", "id": "920a774e-617a-4a5b-82ea-8205c18eef75" },
    { "name": "Sales", "id": "cfd90465-28fa-4b9a-be3e-ef2517e987e9" },
    { "name": "Marketing", "id": "252fc1e8-aead-45cc-9d7d-e6003897bbf9" },
    { "name": "Operations", "id": "e573dd1c-4cd4-451d-a844-a25210e91135" },
    { "name": "Management", "id": "2b9edccb-41fc-4fc5-b832-ac86a034a877" },
    { "name": "Executive", "id": "aef293ee-8dcc-4d89-99cf-1b8f61bab07b" },
    { "name": "HR", "id": "ddd31c01-a30d-4e72-8e8b-d710fcc4fb56" }
  ]

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
    employees: () => employees,
    employee: (root: any, { id }: any) => employees.find(employee => employee.id === id),
    departments: () => departments,
    department: (root: any, { id }: any) => departments.find(dept => dept.id === id)
  },
  Department: {
    employees: ({ id }: any) => employees.filter(employee => employee.departmentId === id)
  }
};

async function dbConnect() {
  try { 
    console.log(MONGO_URL);
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true })
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
