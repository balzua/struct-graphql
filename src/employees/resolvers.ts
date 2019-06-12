import { Department } from "../departments/models";
import { Employee } from "./models";

export const resolvers = {
    Query: {
        employees: () => Employee.find(),
        employeeById: (root: any, { id }: any) => Employee.findOne({ id }),
    },
    Employee: {
        department: async (employee: any) => {
            const dept = await Department.findOne({ id: employee.departmentId })
        },
        manager: async (parent: any) => {
            const manager = await Employee.findOne({ id: parent.managerId })
            return manager;
        }
    }
}