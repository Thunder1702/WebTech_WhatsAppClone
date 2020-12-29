const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.put('/' , (req,res) => {
    let user = req.body;
    
    checkValidity(user).then(()=>{
        db.query("UPDATE users SET profilbild= $1,status=$2 WHERE name = $3",[user.profilbild,user.status,user.name]).then(data=>{
            res.status(200).json({message: "Updated row"});
        }).catch(error => {
            res.status(404).json({message: "Could not be updated."});
        });
    }).catch(error => {
        res.status(404).json({message: "There exists no entry with this Username or invalid input."});
    });
});

let checkValidity = function (user){
    return new Promise((resolve,reject) => {
        if(user.name && user.status&& user.profilbild){
            db.query("SELECT * FROM users WHERE name = $1;",[user.name])
            .then(data=>{
                if(data.rowCount = 1){
                    resolve();
                }else{
                    reject();
                }
            }).catch(error=>{
                console.log("No one with this id found in DB");
            });
        }else{
            reject();
        } 
    });
}

module.exports = router;