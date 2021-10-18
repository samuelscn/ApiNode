require('dotenv').config()
const express = require('express');
const path = require('path');
const PORT = 3000;
require(path.join(__dirname, 'database', 'mongo'));


const app = express();
app.use((require(path.join(__dirname, 'communications', 'routes'))));

app.listen(PORT);