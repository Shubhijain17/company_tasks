import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"})) 
app.use(express.urlencoded({extends:true, limit:'16kb'}))
app.use(express.static('public'))

app.use(cookieParser())

// routes
import userRouter from "./routers/user.routers.js";
import { ApiError } from "./utills/ApiError.js";
app.use('/api/v1/users', userRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message: message,
        error: err.error || [],
    });
});


export {app}
