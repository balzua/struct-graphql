import * as mongoose from 'mongoose';

// Mongoose Schema & model creation
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jobTitle: String,
    departmentId: String,
    managerId: String,
    id: String
})
// Create text indexes on the firstName, lastName, and jobTitle properties - to be used for searches later
employeeSchema.index({ firstName: 'text', lastName: 'text', jobTitle: 'text' });
export const Employee = mongoose.model('Employee', employeeSchema);

// GraphQL Schema Type Definition
export const typeDef = 
`type Employee {
    firstName: String
    lastName: String
    fullName: String
    jobTitle: String
    id: ID
    department: Department
    manager: Employee
    manages: [Employee]
    sharesManagerWith: [Employee]
}`;