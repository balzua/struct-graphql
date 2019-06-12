import * as mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jobTitle: String,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department'},
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
})

const departmentSchema = new mongoose.Schema({
    name: String
})

export const Employee = mongoose.model('Employee', employeeSchema);
export const Department = mongoose.model('Department', departmentSchema);