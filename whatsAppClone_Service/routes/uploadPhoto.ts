import express from "express";
import { Client } from "pg";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

function checkValidity(photo: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    if (photo.id && photo.url && photo.description && photo.photo_uploaded_by) {
      db.query("SELECT * FROM photo WHERE id = $1;", [photo.id])
        .then((data) => {
          if (data.rowCount > 0) {
            reject();
          } else {
            resolve();
          }
        })
        .catch((error) => {
          console.log("ERROR");
        });
    } else {
      reject();
    }
  });
}

router.post("/",checkAuth, (req, res) => {
  let photo = req.body;
  let db = getDb();

  checkValidity(photo, db)
    .then(() => {
      db.query("INSERT INTO photo VALUES ($1,$2,$3,$4);", [
        photo.id,
        photo.url,
        photo.description,
        photo.photo_uploaded_by,
      ])
        .then((data) => {
          res.status(200).json({ message: "Added row" });
        })
        .catch((error) => {
          res.status(404).json({ message: "Problems" });
        });
    })
    .catch((error) => {
      res
        .status(404)
        .json({ message: "Row allready exists with this id or phone_number." });
    });
});

export default router;
