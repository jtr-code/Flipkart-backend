import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@ecommerce.hpulrzn.mongodb.net/?retryWrites=true&w=majority`;
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
