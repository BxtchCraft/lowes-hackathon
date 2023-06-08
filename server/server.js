// Import Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Define Routes
// const productRoutes = require('./routes/productRoutes');

// Setup App
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express!'});
});

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

// comment