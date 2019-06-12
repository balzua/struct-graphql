import * as mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    jobTitle: String,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department'},
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
})

const departmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
})

const Employee = mongoose.model('Employee', employeeSchema);
const Department = mongoose.model('Department', departmentSchema);
