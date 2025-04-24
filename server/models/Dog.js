import mongoose from "mongoose";

// This code defines a Mongoose schema and model for a Dog entity in a MongoDB database
const dogSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    trainingStatus: { type: String, required: true, enum: ['Trained', 'Untrained'] },
    reserved: { type: Boolean, default: false },
    inServiceCountry: { type: String, required: true }
});

const Dog = mongoose.model('Dog', dogSchema);
export default Dog;