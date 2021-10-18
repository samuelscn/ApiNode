const mongoose = require('mongoose');

const NegocioSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true,
    },
    total_value: {
        type: Number,
        require: true,
    },
});

const Negocio = mongoose.model('Negocio', NegocioSchema);

module.exports = Negocio;