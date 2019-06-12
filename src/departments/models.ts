import * as mongoose from 'mongoose';

// Mongoose Schema & model creation
const departmentSchema = new mongoose.Schema({
    id: String,
    name: String
})
export const Department = mongoose.model('Department', departmentSchema);

// GraphQL Schema Type Definition
export const typeDef = 
`type Department {
    employees: [Employee]
    name: String
    id: ID
}`;
