/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var startingListSchema = new Schema({
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
    plec: { 
        type: String,
        required: true
    },
    nrStartowy: { 
        type: String,
        required: true
    },
    _zaw : { type: Schema.ObjectId, ref: 'Zawodnik' },
    _gr : { type: Schema.ObjectId, ref: 'Grupa' }
});

module.exports = mongoose.model("ListaStartowa", startingListSchema);