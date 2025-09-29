const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send('Welcome to the Personal Budget API');
});

app.get('/budget', (req, res) => {
  fs.readFile(path.join(__dirname, 'budget.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Error loading budget data');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
