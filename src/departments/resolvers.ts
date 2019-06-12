import { Department } from "./models";
import { Employee } from "../employees/models";

export const resolvers = {
    Query: {
        departments: () => Department.find(),
        departmentById: (root: any, { id }: any) => Department.findOne({ id }),
    },
    Department: {
        employees: (root: any) => Employee.find({ departmentId: root.id })
    }
}