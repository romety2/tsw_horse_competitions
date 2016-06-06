/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    nazwa: { 
        type: String,
    },
    plec: {
        type: String,
    },
    zawodnicy : [{ type: Schema.ObjectId, ref: "ZawodnikZawody" }],
    sedziowie : [{ type: Schema.ObjectId, ref: "Sedziowie" }]
});

module.exports = mongoose.model("Grupy", groupSchema);