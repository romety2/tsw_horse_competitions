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
    role: {
        type: String,
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Uzytkownik", userSchema);