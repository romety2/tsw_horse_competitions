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
    is: {
        type: String,
    },
    etap: {
        type: String,
    },
    ls : [{ type: Schema.ObjectId, ref: "ListaStartowa" }],
    grupy : [{ type: Schema.ObjectId, ref: "Grupa" }],
    oceny : [{ type: Schema.ObjectId, ref: "Oceny" }]
});

module.exports = mongoose.model("Zawody", competitionSchema);