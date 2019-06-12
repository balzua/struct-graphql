import { Department } from "../departments/models";
import { Employee } from "./models";

export const resolvers = {
    Query: {
        employees: () => Employee.find(),
        employeeById: (root: any, { id }: any) => Employee.findOne({ id }),
    },
    Employee: {
        department: (employee: any) => Department.findOne({ id: employee.departmentId }),
        manager: (parent: any) => Employee.findOne({ id: parent.managerId })
    }
}