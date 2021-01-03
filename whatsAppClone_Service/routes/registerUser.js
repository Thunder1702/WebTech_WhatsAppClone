const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.post('/' , (req,res) => {
    let user = req.body;
    
    checkValidity(user).then(()=>{
        db.query("INSERT INTO users VALUES ('','',$1,$2,$3);",[user.name,user.password,user.email]).then(data=>{
            res.status(200).json({message: "Added row"});
        }).catch(error => {
            res.status(404).json({message: "Problems"});
        });
    }).catch(error => {
        res.status(404).json({message: "Username allready exists."});
    });
});

let checkValidity = function (user){
    return new Promise((resolve,reject) => {
        if(user.name && user.password && user.email){
            db.query("SELECT * FROM users WHERE name = $1;",[user.name])
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