import mongoose from 'mongoose';

// This code defines a Mongoose schema and model for a Monkey entity in a MongoDB database
const monkeySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    species: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    trainingStatus: { type: String, required: true, enum: ['Trained', 'Untrained'] },
    reserved: { type: Boolean, default: false },
    inServiceCountry: { type: String, required: true }
});

const Monkey = mongoose.model('Monkey', monkeySchema);
export default Monkey;