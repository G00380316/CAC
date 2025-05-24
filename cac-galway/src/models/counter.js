import mongoose, { Schema, models } from "mongoose";

const CounterSchema = new Schema({
    date: {
        type: String,
        unique: true,
    },
    count: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }
);


const Counter = models.Counter || mongoose.model('Counter', CounterSchema);
export default Counter;

