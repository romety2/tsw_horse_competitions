/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var competitionSchema = new Schema({
    typ: { 
        type: String,
    },
    glowa: {
        type: String,
    },
    kloda: { 
        type: String,
    },
    nogi: {
        type: String,
    },
    ruch: {
        type: String,
    },
    status: {
        type: String,
    },
    sedzia : { type: Schema.ObjectId, ref: "Uzytkownik" },
    zawodnik : { type: Schema.ObjectId, ref: "ListaStartowa" }
});

module.exports = mongoose.model("Oceny", competitionSchema);