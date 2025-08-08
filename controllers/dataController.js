const DataModel = require('../models/dataModel');

// POST /api/data
exports.addData = async (req, res) => {
  try {
    const { string1, string2, string3, string4 } = req.body;

    if (!string1 || !string4 || typeof string2 !== 'number' || typeof string3 !== 'number') {
      return res.status(400).json({ message: 'Missing or invalid data' });
    }

    const newData = new DataModel({ string1, string2, string3, string4 });
    const savedData = await newData.save();

    res.status(201).json({ message: 'Data saved successfully', data: savedData });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// GET /api/data
exports.getData = async (req, res) => {
  try {
    const data = await DataModel.find();
    if (!data.length) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};


exports.getStatus = (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running smoothly 🚀',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};