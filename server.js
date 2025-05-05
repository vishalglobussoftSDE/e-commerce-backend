import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users/user.route.js';
import connectDB from './DB/db.config.js';
import cors from 'cors';
const app = express();
dotenv.config();
connectDB(); 
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin : "http://localhost:5173",
    methods : "GET, POST, PUT, DELETE, HEAD",
    credentials : true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is testing route route
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Backend!');
});

app.use('/api/v1/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});