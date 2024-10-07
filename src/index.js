import dotenv from 'dotenv';
import connectDB from './dbconnection/db.js';
import { app } from './app.js';
dotenv.config({ path: "../.env" });

let port = process.env.PORT;

connectDB().then(()=>{
    app.listen(port|| 8200, ()=>{
        console.log(`⚙ Server is running: ${port}`)
    })
}).catch((err)=>{
    console.log("mongo db connection failed", err)
})



