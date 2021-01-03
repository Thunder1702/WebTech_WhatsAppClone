const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.post('/' , (req,res) => {
    let photo = req.body;
    
    checkValidity(photo).then(()=>{
        db.query("INSERT INTO photo VALUES ($1,$2,$3,$4);",[photo.id,photo.url,photo.description,photo.photo_uploaded_by]).then(data=>{
            res.status(200).json({message: "Added row"});
        }).catch(error => {
            res.status(404).json({message: "Problems"});
        });
    }).catch(error => {
        res.status(404).json({message: "Row allready exists with this id or phone_number."});
    });
});

let checkValidity = function (photo){
    return new Promise((resolve,reject) => {
        if(photo.id && photo.url&&photo.description&&photo.photo_uploaded_by){
            db.query("SELECT * FROM photo WHERE id = $1;",[photo.id])
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