import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI || "",
      {
        dbName: "nextWeb",
      }
    );
    console.log("Db Connected host:", connection.host);
  } catch (error) {
    console.log("Failed to connect Db:", error);
  }
};
