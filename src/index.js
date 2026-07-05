import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./env"})



connectDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  throw err;
})








//second way to connect to the database
// function connectDB() {}
// connectDB();


/*
//professional way to connect to the database
//using IIFE (Immediately Invoked Function Expression)
//proffessional alway start with semicolon because if the previous file is not ended with semicolon it will throw error
//IIFE is a function that is invoked immediately after it is defined and its main purpose is to create a new scope and avoid polluting the global scope 

import express from "express";
const app = express();
import { DB_NAME } from "./constants.js";

;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
  
    //app.on used to listen for events emitted by the app object. 
    // In this case, it is listening for the "error" event, which is emitted when there is an error connecting to MongoDB. 
    // When this event is emitted, the callback function is executed, which logs the error message to the console and throws the error to stop the application from running.
    app.on("error", (err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    })

    //app.listen is used to start the server and listen for incoming requests on the specified port.
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
})();

*/