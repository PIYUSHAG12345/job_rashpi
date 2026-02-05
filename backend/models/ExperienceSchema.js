import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    experience: { type: String, required: true },
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
