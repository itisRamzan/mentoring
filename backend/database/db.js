const mongoose = require("mongoose");
const DBUrl = process.env.DATABASE_URL;
const connectToDB = async () => {
    await mongoose.connect(DBUrl)
    .then(() => {
        console.log("Connected MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB Error = " + err);
    });
}

module.exports = {
    connectDB : connectToDB
};