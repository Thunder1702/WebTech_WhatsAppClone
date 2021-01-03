const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.get('/' , (req,res) => {
    let user = req.body;

    db.query("SELECT * FROM users WHERE name = $1 AND password = $2;",[user.name,user.password].then(data=>{
        if(data.rowCount = 1){
            res.status(200).json({message: "true"});
        }else{
            res.status(404).json({message: "false"});
        }
    }).catch(error => {
        res.status(400).json({message: "ERROR"});
    }));
});

module.exports = router;