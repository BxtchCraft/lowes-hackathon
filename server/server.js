// Import Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Setup App
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Define API Routes
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express!'});
});

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/public')));

// The "catch-all" handler: for any request that doesn't match one above, 
// send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Start Server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
