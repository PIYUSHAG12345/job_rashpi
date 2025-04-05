import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    fileName: String,
    score: Number,
    uploadDate: { type: Date, default: Date.now }
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
