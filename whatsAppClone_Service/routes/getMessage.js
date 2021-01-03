const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.get('/:id/:user' , (req,res) => {
    let id = req.params.id;
    let user = req.params.user;
    
    db.query("SELECT * FROM message WHERE id = $1 AND (message_to = $2 OR message_from = $3);",[id,user,user]).then(data =>{
        if(data.rowCount >0){
            res.status(200).json(data.rows);
        }else{
            res.status(404).json({message: "No message with this id found."});
        }
    }).catch(error =>{
        res.status(400).json({message: "Error while query."});
    });

});

module.exports = router;