const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    }]
});

const MentorModel = mongoose.model("mentor", mentorSchema);

module.exports = {
    MentorModel: MentorModel
};
