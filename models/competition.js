/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var competitionSchema = new Schema({
    wydarzenie: { 
        type: String,
    },
    opis: {
        type: String,
    },
    zakres: { 
        type: String,
    },
    rodzaj: {
        type: String,
    },
});

module.exports = mongoose.model("Zawody", competitionSchema);