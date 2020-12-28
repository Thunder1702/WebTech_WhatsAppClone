const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;


router.get('/:name' , (req,res) => {
    let db = getDb();
    let userName = req.params.name;
    db.query("SELECT * FROM users WHERE name = $1;",[userName]).then(data=>{
        if(data.rowCount=1){
            res.status(200).json(data.rows);
        }else{
            res.status(404).json({message: "No contact found."});
        }
    }).catch(error =>{
        res.status(400).json({message: "ERROR"});
    });
});

module.exports = router;