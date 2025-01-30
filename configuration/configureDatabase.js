import mongoose from "mongoose";
const mongoUrl = process.env.DB_URl || "mongodb://127.0.0.1:27017/Jobportal";

export const connectDatabase = () => {
  if (!mongoUrl) {
    return console.log("Mongo URI not provided!");
  }
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Connected to MongoDB!!!!!");
    })
    .catch((error) => {
      console.error("Connection error", error);
    });
};