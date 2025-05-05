import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users/user.route.js';
import productRoutes from './routes/products/product.route.js';
import connectDB from './DB/db.config.js';
const app = express();
dotenv.config();
connectDB(); 
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // public access


// this is testing route route
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Backend!');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});