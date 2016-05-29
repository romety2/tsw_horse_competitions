/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    imie: { 
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required: true
    },
    nazwa: { 
        type: String,
        required: true
    },
    dataUr: {
        type: String,
        required: true
    },
    plec: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Zawodnik", playerSchema);