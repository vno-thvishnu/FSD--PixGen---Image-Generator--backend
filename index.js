import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config();

const app=express();
app.use(cors())
app.use(express.json({limit:'50mb'}))


app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)
app.use('/auth',userRoutes)


app.get('/',async(req,res)=>{
    res.send('Helloooooo')
})

const startServer = async()=>{
try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8080,()=>console.log('server has started on port'))

} catch (error) {
    console.log(error)
}


}
startServer()