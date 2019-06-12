import * as mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jobTitle: String,
    departmentId: String,
    managerId: String
})

export const Employee = mongoose.model('Employee', employeeSchema);