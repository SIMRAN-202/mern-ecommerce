//Packages
import path from 'path'
import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

//utils
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json());
app.use(urlencoded({extended:true}))
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.listen(port, ()=> console.log(`server running on port: ${port}`));