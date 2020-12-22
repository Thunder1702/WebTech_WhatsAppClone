const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.post('/' , (req,res) => {
    let contact = req.body;
    

    checkValidity(contact).then(()=>{
        db.query("INSERT INTO contact VALUES ($1,$2,$3,$4,$5);",[contact.id,contact.first_name,contact.last_name,contact.email,contact.phone_number]).then(data=>{
            res.status(200).json({message: "Added row"});
        }).catch(error => {
            res.status(404).json({message: "Problems"});
        });
    }).catch(error => {
        res.status(404).json({message: "Row allready exists with this id or phone_number."});
    });
});

let checkValidity = function (contact){
    return new Promise((resolve,reject) => {
        if(contact.id && contact.phone_number&&contact.first_name&&contact.last_name&&contact.email){
            db.query("SELECT * FROM contact WHERE id = $1 OR phone_number = $2;",[contact.id,contact.phone_number])
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