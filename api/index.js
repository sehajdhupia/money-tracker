const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Transaction = require('./models/Transaction');
const app = express();
const mongoose = require("mongoose");

//app.use(cors({ origin: '*' }));
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend URL
}));


app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({ message: 'test ok' }); // Corrected: Use an object with key-value pairs
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, price, description, datetime } = req.body;

    try {
        const transaction = await Transaction.create({ name, price, description, datetime });
        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/transactions' , async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);

});


const port = 4040; // Declare the port variable
app.listen(port);
//Elxlab4f8OHb1fgN