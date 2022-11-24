const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = new Schema({
    _id: {
        type: String
    },
    nome: {
        type: String
    },
    preco: {
        type: Number
    },
    categoria: {
        type: String
    }
})

mongoose.model("games", Game);