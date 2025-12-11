import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    question: String,
    answer: String,
    feedback: String,
    score: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Interview", interviewSchema);
