const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cronJob = require("./src/service/cron"); // Import the cron job
// const { io } = require('./src/service/socket');

const PORT =process.env.PORT || 3000
const app = express();

// const server = http.createServer(app);

app.use(cors())
// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection
mongoose.connect(process.env.DB_HOST, {
    // useNewUrlParser: true,
    useUnifiedTopology: true
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//import index main routes here 
const mainroutes =require("./src/routes/index")
app.use("/",mainroutes)

// io.attach(server);

app.get('/', (req, res, next) => {
    // Render the home page
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
