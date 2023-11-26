const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer().any();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5000',
}));
app.use(express.static('public'));


mongoose.set('debug', true);
mongoose.connect('mongodb+srv://bilguun:0930@atlascluster.0roxywf.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

// Define MongoDB schema
const userSchema = new Schema({
  name: String,
  gender: String,
  RD: String,
});

const User = mongoose.model('User', userSchema);

app.post('/createUser', async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  try {
    console.log('Request received:', req.body);

    const { name, gender, RD } = req.body;
    const file = req.files ? req.files[0] : null;
    const newUser = new User({ name, gender, RD });
    await newUser.save();

    if (file) {
      // Handle file logic if needed
    }

    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});

module.exports.handler = serverless(app);
