import express from "express";
import { Client } from "pg";
const router = express.Router();
import { getDb } from "../db";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const privateKEY = fs.readFileSync(
  path.join(__dirname, "../private.key"),
  "utf8"
);

function checkValidity(user: any, db: Client) {

  console.log(user.name);

  let pr = new Promise<void>((resolve, reject) => {
    if (
      user.name && user.password && user.email) {
      db.query("SELECT * FROM users WHERE name = $1 OR email = $2;", [user.name, user.email])
        .then((data) => {
          if (data.rowCount > 0) {
            console.log("Bekommt mehr als eine Zeile zurück.");
            reject();
          } else {
            console.log("Funktioniert!!!!");
            resolve();
          }
        }).catch((error) => { console.log("ERROR"); });
    } else {
      console.log("Error beim Query, select hat nicht funktioniert!");
      reject();
    }
  });
  return pr;
}


router.post("/", (req, res) => {
  let user = req.body;

  let db = getDb();

  checkValidity(user, db)
    .then(() => {
      db.query("INSERT INTO users VALUES ('','',$1,$2,$3);", [
        user.name,
        user.password,
        user.email

      ])
        .then((data) => {
          const token = jwt.sign(
            {
              user: user.name,
            },
            privateKEY,
            {
              expiresIn: "1h",
            }
          );
          //res.status(200).json({ message: "Added row" });
          res.json({
            token: token,
          });
        })
        .catch((error) => {
          res.status(404).json({ message: "Problems" });
        });
    })
    .catch((error: any) => {
      res.status(404).json({ message: "Username or email allready exists." });
    });
});

export default router;
