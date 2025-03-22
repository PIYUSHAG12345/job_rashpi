import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import {config} from "dotenv"
import userRouter from "./router/userRouter.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());
config({path: "./config/config.env"})

app.use("/api/v1/user",userRouter)
dbConnection();

app.use(cors({
    origin : ["http://localhost:5174/"],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true,
}))



export default app