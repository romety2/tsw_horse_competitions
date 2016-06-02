/*jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    imie: { 
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    password: { 
        type: String,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Uzytkownik", userSchema);