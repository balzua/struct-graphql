import * as mongoose from 'mongoose';

// Mongoose Schema & model creation
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jobTitle: String,
    departmentId: String,
    managerId: String
})
export const Employee = mongoose.model('Employee', employeeSchema);

// GraphQL Schema Type Definition
export const typeDef = 
`type Employee {
    firstName: String
    lastName: String
    jobTitle: String
    department: Department
    manager: Employee
}`;