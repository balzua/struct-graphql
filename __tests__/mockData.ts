// Mock data the database will be seeded with
const mockData = {
    employees: [
        { id: '1', firstName: 'John', lastName: 'Smith', jobTitle: 'Writer', departmentId: '1', managerId: '2' },
        { id: '2', firstName: 'Steve', lastName: 'Williams', jobTitle: 'Head Writer', departmentId: '1', managerId: '3' },
        { id: '3', firstName: 'Quentin', lastName: 'Tarantino', jobTitle: 'Director', departmentId: '2', managerId: null },
        { id: '4', firstName: 'Sam', lastName: 'Jackson', jobTitle: 'Actor', departmentId: '3', managerId: '3' },
    ],
    departments: [
        { id: '1', name: 'Writing' },
        { id: '2', name: 'Management' },
        { id: '3', name: 'Cast' }
    ]
}

// Test cases (contains queries and expected results)
const testCases = [
    {
        name: 'Fetch all employees',
        query: `query {
            employees {
                firstName
                lastName
                fullName
                jobTitle
            }
        }`,
        expected: { 
            data: {
                employees: mockData.employees.map(employee => ({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    jobTitle: employee.jobTitle,
                    fullName: employee.firstName + ' ' + employee.lastName
                }))
            }
        }
    },
    {
        name: 'Fetch a single employee by ID',
        query: `query {
            employeeById(id:"1") {
                firstName
            }
        }`,
        expected: {
            data: {
                employeeById: {
                    firstName: mockData.employees.find(employee => employee.id === '1')!.firstName
                }
            }
        }
    },
    {
        name: 'Fetch all departments',
        query: `query {
            departments {
                id
                name
            }
        }`,
        expected: {
            data: {
                departments: mockData.departments
            }
        }
    },
    {
        name: 'Fetch a single department by ID',
        query: `query {
            departmentById(id:"1") {
                name
            }
        }`,
        expected: {
            data: {
                departmentById: {
                    name: mockData.departments.find(dept => dept.id === '1')!.name
                }
            }
        }
    },
    {
        name: 'Search for employee',
        query: `query {
            employeeSearch(searchTerm:"Steve") {
                firstName
            }
        }`,
        expected: {
            data: {
                employeeSearch: [{
                    firstName: mockData.employees.find(employee => employee.firstName === 'Steve')!.firstName
                }]
            }
        }
    },
    {
        name: 'Department employees belong to',
        query: `query {
            employees {
                department {
                    id
                    name
                }
            }
        }`,
        expected: {
            data: {
                employees: mockData.employees.map(employee => ({
                    department: mockData.departments.find(dept => dept.id === employee.departmentId)
                }))
            }
        }
    },
    {
        name: 'Employee\'s manager',
        query: `query {
            employeeById(id:"1") {
                manager {
                    firstName
                }
            }
        }`,
        expected: {
            data: {
                employeeById: {
                    manager: {
                        // Find the employee who's id is equal to employee #1's managerId
                        firstName: mockData.employees.find(manager => manager.id === mockData.employees[0].managerId)!.firstName
                    }
                }
            }
        }
    },
    {
        name: 'Update employee',
        query: `mutation {
            updateEmployeeById(id:"1", firstName: "Ted", lastName: "Martinez", jobTitle: "Supporting Actor", departmentId: "3", managerId: "3") {
                firstName
                lastName
                jobTitle
                department {
                    name
                }
                manager {
                    firstName
                }
            }
        }`,
        expected: {
            data: {
                updateEmployeeById: {
                    firstName: "Ted",
                    lastName: "Martinez",
                    jobTitle: "Supporting Actor",
                    department: {
                        name: 'Cast'
                    },
                    manager: {
                        firstName: 'Quentin'
                    }
                }
            }
        }
    },
]

module.exports = { mockData, testCases }