const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;


router.get('/:user/:id' , (req,res) => {
    let db = getDb();
    let user = req.params.user;
    let contactId = req.params.id;
    db.query("SELECT m.message_text,m.message_to,m.message_from FROM contact c, message m WHERE c.users_contact = $1 AND c.id = $2 AND ((m.message_to = $3 AND m.message_from = $4) OR (m.message_to = $5 AND m.message_from = $6));",[user,id,user,id,id,user]).then(data=>{
        if(data.rowCount>0){
            res.status(200).json(data.rows);
        }else{
            res.status(404).json({message: "No contact found."});
        }
    }).catch(error =>{
        res.status(400).json({message: "ERROR"});
    });
});

module.exports = router;