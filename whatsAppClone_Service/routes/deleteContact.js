const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const getDb = require("../db").getDb;
let db = getDb();

router.delete('/:id' , (req,res) => {
    let id = req.params.id;
    
    checkIfExists(id).then(()=>{
        db.query("DELETE FROM contact WHERE id = $1",[id]).then(data=>{
            res.status(200).json({message: "Deleted row"});
        }).catch(error => {
            res.status(404).json({message: "Could not be deleted."});
        });
    }).catch(error => {
        res.status(404).json({message: "There exists no entry with this id."});
    });
});

let checkIfExists = function (id){
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM contact WHERE id = $1;",[id])
            .then(data=>{
                if(data.rowCount = 1){
                    resolve();
                }else{
                    reject();
                }
            }).catch(error=>{
                console.log("No one with this id found in DB");
            });
    });
}

module.exports = router;