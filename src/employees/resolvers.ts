import { Department } from "../departments/models";
import { Employee } from "./models";

// Helper function that takes in an object and deletes any keys which have undefined as a value.
// Mutates the original object.
function removeUndefinedProps(obj: { [index: string]: {value: string} }) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === "undefined") delete obj[key];
    })
}

export const resolvers = {
    Query: {
        employees: () => Employee.find(),
        employeeById: (root: any, { id }: any) => Employee.findOne({ id }),
    },
    Mutation: {
        updateEmployeeById: (root: any, { id, firstName, lastName, departmentId, managerId }: any) => {
            let updatedEmployee: {[index: string]: {value: string}} = {
                "firstName": firstName,
                "lastName": lastName,
                "departmentId": departmentId,
                "managerId": managerId
            }
            // Remove undefined properties from the updatedEmployee argument - they are not to be updated
            removeUndefinedProps(updatedEmployee);
            // Mongoose query to update the employee with the provided id. Returns the updated document.
            return Employee.findOneAndUpdate({ id }, updatedEmployee, { new: true });
        }
    },
    Employee: {
        fullName: (parent: any) => parent.firstName + ' ' + parent.lastName,
        department: (parent: any) => Department.findOne({ id: parent.departmentId }),
        // Find the employee whose id is equal to this employee's managerId
        manager: (parent: any) => Employee.findOne({ id: parent.managerId }),
        // Find employees who have this employee's id as their managerId
        manages: (parent: any) => Employee.find({ managerId: parent.id }),
        // Find employees who also have the same manager id as this employee's managerId
        sharesManagerWith: (parent: any) => Employee.find({ managerId: parent.managerId }),
    }
}