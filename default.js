import { products } from "./constants/data.js";
import Product from "./model/product-schema.js";

const DefaultData = async () => {
  try {
    await Product.insertMany(products);
    console.log("Data imported succesfully");
  } catch (error) {
    console.log("Error in default data", error.message);
  }
};

export default DefaultData;
