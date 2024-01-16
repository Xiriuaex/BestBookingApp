import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));//helps parse url
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));//this says that the backend only takes requests from this frontend url
    //and url must includes the credentials that is http cookies.

app.use(express.static(path.join(__dirname, "../../frontend/dist")));       //serving static assets (html, js, css) from frontend
//the frontend is posted via backend server, so another server is not needed for frontend.
//backend served frontend as well


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 

app.listen(3000, () => {
    console.log("server running on localhost:3000");
});