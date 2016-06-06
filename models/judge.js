/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    imie: { 
        type: String,
    },
    nazwisko: {
        type: String,
    },
    username: { 
        type: String,
    },
    _uz : { type: Schema.ObjectId, ref: 'Uzytkownik' },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Sedzia", userSchema);