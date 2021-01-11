import express from "express";
import { Client } from "pg";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

function checkValidity(contact: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    if (
      contact.id &&
      contact.phone_number &&
      contact.first_name &&
      contact.last_name &&
      contact.email
    ) {
      db.query("SELECT * FROM contact WHERE id = $1 AND users_contact = $2;", [
        contact.id,
        contact.users_contact,
      ])
        .then((data) => {
          if ((data.rowCount = 1)) {
            resolve();
          } else {
            reject();
          }
        })
        .catch((error) => {
          console.log("No one with this id found in DB");
        });
    } else {
      reject();
    }
  });
}

router.put("/", checkAuth, (req, res) => {
  let contact = req.body;

  let db = getDb();
  checkValidity(contact, db)
    .then(() => {
      db.query(
        "UPDATE contact SET first_name= $1,last_name=$2,email=$3,phone_number=$4 WHERE id = $5",
        [
          contact.first_name,
          contact.last_name,
          contact.email,
          contact.phone_number,
          contact.id,
        ]
      )
        .then((data) => {
          res.status(200).json({ message: "Updated row" });
        })
        .catch((error) => {
          res.status(404).json({ message: "Could not be updated." });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "There exists no entry with this id or invalid input.",
      });
    });
});

export default router;
