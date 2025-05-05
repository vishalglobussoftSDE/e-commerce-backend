import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is testing route route
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});