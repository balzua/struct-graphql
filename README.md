# struct-graphql

## Running the application
Use `docker-compose up -d` to run the application. The application will be available on port 4000 of the container

## Running tests
First please use `npm install` to install dependencies for the test.
Then use `npm test` to run the tests.

## API Documentation
### Queries
- `employees`: returns a full list of all employees
- `employeeById(id)`: returns a single employee based on the id provided
- `employeeSearch(searchTerm)`: searches the database for employees with a name or job title containing the provided search term.
- `departments`: returns a full list of all departments
- `departmentById(id)`: returns a single department based on the id provided
### Mutations
- `updateEmployeeById(id, firstName?, lastName?, jobTitle?, departmentId?, managerId?)`: updates an employee of a given ID. Provide one or more additional options to change the corresponding fields
### Employee Fields
- id
- firstName
- lastName
- fullName
- jobTitle
- manager: returns an `Employee` object corresponding to the employee's manager. Returns null if the employee is the CEO
- manages: returns an array of `Employee` objects which have this employee as a manager
- sharesManagerWith: returns an array of `Employee` objects which have the same manager as this employee
- department: returns a `Department` object of this employee's department
### Department fields
- id
- name
- employees: returns an array of `Employee` objects of all employees in this department

