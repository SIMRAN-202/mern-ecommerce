//Packages
import path from 'path'
import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

//utils
import connectDB from './config/db.js'

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send('Server is running')
})

app.listen(port, ()=> console.log(`server running on port: ${port}`));