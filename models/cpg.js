/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var competitionSchema = new Schema({
    zawodnik: { 
        type: String,
    },
    zawody: {
        type: String,
    },
    grupa: { 
        type: String,
    },
    nrStartowy: { 
        type: String,
    },
});

module.exports = mongoose.model("ZawodyZawodnicyGrupy", competitionSchema);