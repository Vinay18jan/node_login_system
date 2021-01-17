const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const auth = require('./routes/auth');

//load env
dotenv.config({ path: './config/.env' });
connectDB();

const app = express();
//body parser
app.use(express.json());

//logging middleware
app.use(morgan('dev'));

//routes info here
app.use('/user', auth);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`SERVER RUNNING on PORT ${PORT}`));