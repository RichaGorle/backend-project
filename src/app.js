import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

//cors is a middleware that allows cross-origin requests. 
// It is used to enable communication between the frontend and backend when they are hosted on different domains or ports.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//express.json() is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser.
// limit is used to restrict the size of the JSON payload.
app.use(express.json({limit: '16kb'})); 

//express.urlencoded() is a built-in middleware function in Express.
// It parses incoming requests with URL-encoded payloads and is based on body-parser.
// extended: true allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
// limit is used to restrict the size of the URL-encoded payload.
app.use(express.urlencoded({extended: true, limit: '16kb'}));


app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names

//routes
import userRouter from "./routes/user.routes.js";


//rotes declaration
app.use("/api/v1/users",userRouter)

export {app}