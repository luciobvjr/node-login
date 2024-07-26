import express from 'express';

const app = express();

// Public Route
app.get('/hello-world', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});