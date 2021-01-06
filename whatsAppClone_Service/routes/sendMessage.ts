import express from "express";
import { Client } from "pg";
import { getDb } from "../db";

const router = express.Router();

function checkValidity(message: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    if (
      message.id &&
      message.message_to &&
      message.message_from &&
      message.message_text &&
      message.read
    ) {
      db.query("SELECT * FROM message WHERE id = $1;", [message.id])
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

router.post("/", (req, res) => {
  let message = req.body;
  let db = getDb();

  checkValidity(message, db)
    .then(() => {
      db.query("INSERT INTO message VALUES ($1,$2,$3,$4,$5);", [
        message.id,
        message.message_to,
        message.message_from,
        message.message_text,
        message.read,
      ])
        .then((data) => {
          res.status(200).json({ message: "Added row" });
        })
        .catch((error) => {
          res.status(404).json({ message: "Problems" });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "Row allready exists with this id." });
    });
});

export default router;
