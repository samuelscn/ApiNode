const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/linkApiNodeTeste');
mongoose.Promise = global.Promise;

module.exports = mongoose;

