// index.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://bestDb:27017/dockerized-app', { useNewUrlParser: true, useUnifiedTopology: true });

const TestSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number,
});

const TestModel = mongoose.model('Test', TestSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', async (req, res) => {
  const result = await TestModel.find();
  res.json(result);
});

app.post('/submit', async (req, res) => {
  const { name, surname, age } = req.body;
  const testDocument = new TestModel({ name, surname, age });
  await testDocument.save();
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

