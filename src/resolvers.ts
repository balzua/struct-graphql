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