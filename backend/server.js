import express from 'express'
import dotenv from 'dotenv';
import { notFound, ErrorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = process.env.PORT || 5000;

import UserRoutes from './routes/UserRoutes.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', UserRoutes);
app.use(notFound);
app.use(ErrorHandler);





app.get('/', (req, res) => {
    res.send('server is ready');
})
app.listen(5000, () => {
    console.log(`server started on port ${port}`);
    connectDB();

})