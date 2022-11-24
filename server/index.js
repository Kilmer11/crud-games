const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
/*const {v4: uuid} = require("uuid");
const mongoose = require("mongoose");
require("./model/Game");
const Games = mongoose.model("games");*/

app.use(cors());
app.use(express.json());
//Body-Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
//Mongoose
    /*mongoose.Promise = global.Promise;
    mongoose.connect("mongodb+srv://KilmerA:mongo1234@cluster0.bbmgeu5.mongodb.net/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Conectado ao banco de dados!!")
        }).catch((err) => {
            console.log("ERRO: "+err)
        })*/
//Mysql
    const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "**********",
        database: "crudgames"
    })

//Rotas
app.post("/register", (req, res) => {
    const { nome } = req.body;
    const { preco } = req.body;
    const { categoria } = req.body;

    let SQL = "INSERT INTO games (nome, preco , categoria) VALUES (?, ?, ?)";

    db.query(SQL, [nome, preco, categoria], (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })

    /*new Games({
        _id: uuid(),
        nome: req.body.nome,
        preco: req.body.preco,
        categoria: req.body.categoria,
    }).save().then(() => {
        console.log("Game cadastro ao banco!!")
    }).catch((err) => {
        console.log(err)
    })*/
})

app.get("/getCards", (req, res) => {

    /*Games.find().lean().then((games) => {
        res.send(games)
    }).catch((err) => {
        console.log(err);
    })*/
    
    let SQL = "SELECT * FROM games";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
    })

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { nome } = req.body;
    const { preco } = req.body;
    const { categoria } = req.body;

    let SQL = "UPDATE games SET nome = ?, preco = ?, categoria = ? WHERE id = ?";

    db.query(SQL, [nome, preco, categoria, id], (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    let SQL = "DELETE FROM games WHERE id = ?";

    db.query(SQL, [id], (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})


port = 3001;
app.listen(port, () => {
    console.log("Servidor rodando na porta " +port);
})