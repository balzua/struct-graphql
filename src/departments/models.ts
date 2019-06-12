import * as mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    id: String,
    name: String
})

export const Department = mongoose.model('Department', departmentSchema);