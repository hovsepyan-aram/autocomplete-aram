const express = require('express');
const cors = require('cors');
const mockData = require('./mockData');
const app = express();
app.use(cors());

const port = 3001;

app.get('/suggestions', (req, res) => {
  res.status(200);
  res.send(mockData.filter((item) => item.includes(req.query.query)));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
