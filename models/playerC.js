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
});

module.exports = mongoose.model("ZawodnikZawody", startingListSchema);