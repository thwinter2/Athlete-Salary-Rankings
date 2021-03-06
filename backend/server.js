const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let local = true;
let uri = local ? 'mongodb://127.0.0.1:27017/AthleteSalaries' : process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
connection.on('error', err => {
  console.error('connection error:', err)
});

const collegesRouter = require('./routes/colleges');
const leaguesRouter = require('./routes/leagues');
const playersRouter = require('./routes/players');
const teamsRouter = require('./routes/teams');

app.use('/colleges', collegesRouter);
app.use('/leagues', leaguesRouter);
app.use('/players', playersRouter);
app.use('/teams', teamsRouter);

app.listen(port, () => {
  console.log(`Server is running port: ${port}`);
});
