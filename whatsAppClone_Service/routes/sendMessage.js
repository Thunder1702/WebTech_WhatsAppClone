const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.post('/' , (req,res) => {
    let message = req.body;
    
    checkValidity(message).then(()=>{
        db.query("INSERT INTO message VALUES ($1,$2,$3,$4,$5);",[message.id,message.message_to,message.message_from,message.message_text,message.read]).then(data=>{
            res.status(200).json({message: "Added row"});
        }).catch(error => {
            res.status(404).json({message: "Problems"});
        });
    }).catch(error => {
        res.status(404).json({message: "Row allready exists with this id."});
    });
});

let checkValidity = function (message){
    return new Promise((resolve,reject) => {
        if(message.id && message.message_to&&message.message_from&&message.message_text&&message.read){
            db.query("SELECT * FROM message WHERE id = $1;",[message.id])
            .then(data=>{
                if(data.rowCount >0){
                    reject();
                }else{
                    resolve();
                }
            }).catch(error=>{
                console.log("ERROR");
            });
        }else{
            reject();
        }
    })
}

module.exports = router;