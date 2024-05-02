import mongoose from "mongoose";

const configOptions = {
  dbName: "url",
};

export const connectMongoDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, configOptions)
    .then(() => console.log("database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};
