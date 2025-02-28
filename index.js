const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Model
const DataSchema = new mongoose.Schema({
    string1: String,
    string2: Number,
    string3: Number // Changed to Number
});

const DataModel = mongoose.model('Data', DataSchema);

// POST endpoint to add data
app.post('/addData', async (req, res) => {
    try {
        const { string1, string2, string3 } = req.body;

        if (!string1 || typeof string2 !== 'number' || typeof string3 !== 'number') { // Check if string2 and string3 are numbers
            return res.status(400).json({ message: 'Both string1 must be a string and string2 and string3 must be numbers' });
        }


        console.log('Received Data:', { string1, string2, string3 });

        const newData = new DataModel({ string1, string2, string3 });
        const savedData = await newData.save();
        console.log('Saved Data:', savedData);

        res.status(201).json({ message: 'Data saved successfully', data: savedData });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// GET endpoint to fetch all data from the collection
app.get('/getData', async (req, res) => {
    try {
        const data = await DataModel.find(); // Fetch all data from MongoDB

        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        res.status(200).json(data); // Return the fetched data
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
