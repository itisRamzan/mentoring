const mongoose = require("mongoose");

const lateArrivalSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    // file: {
    //     type: BSON,
    //     required: true
    // },
});

const achievementsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    conductedBy: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        required: true
    },
    // certificate: {
    //     type: String,
    //     required: true
    // }
});

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: "password",
        required: true
    },
    college: {
        type: String,
        default: "CBIT, Hyderabad",
    },
    branch: {
        type: String,
        required: true
    },
    lateArrivals: [lateArrivalSchema],
    achievements: [achievementsSchema],
    marks:[],
    undertakingForm:[],
    addressingConcerns:[]
});

const StudentModel = mongoose.model("student", studentSchema);

module.exports = {
    Student: StudentModel
};
