import express from 'express';
import databaseConnect from './databaseConnect';
import User from './models/User';

const app = express();

app.use(express.json());

// Public Route
app.get('/hello-world', (req, res) => {
  res.send('Hello World!');
});

app.post('/auth/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if(!name || !email || !password || !confirmPassword ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if(password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if(await User.findOne({ email })) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({
    name,
    email,
    password
  });

  user.save().then(() => {
    res.status(201).json({ message: 'User created successfully' });
  })
})

// Connect to Database
databaseConnect();

// Start Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});