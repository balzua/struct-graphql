import { Department } from "./models";

export const resolvers = {
    Query: {
        departments: () => Department.find(),
        departmentById: (root: any, { id }: any) => Department.findOne({ id }),
    }
}