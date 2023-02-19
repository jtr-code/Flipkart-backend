import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const Connection = async (URL) => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DATABASE CONNECTECD SUCCESFULLY");
  } catch (error) {
    console.log("DATABASE CONNECTION ERROR", error.message);
  }
};
