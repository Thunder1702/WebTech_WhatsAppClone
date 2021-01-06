import express from "express";
import { Client } from "pg";
const router = express.Router();
import { getDb } from "../db";

function checkValidity(user: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    if (user.name && user.password && user.email) {
      db.query("SELECT * FROM users WHERE name = $1;", [user.name])
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
  let user = req.body;
  console.log(user);

  let db = getDb();

  checkValidity(user, db)
    .then(() => {
      db.query("INSERT INTO users VALUES ('','',$1,$2,$3);", [
        user.name,
        user.password,
        user.email,
      ])
        .then((data) => {
          res.status(200).json({ message: "Added row" });
        })
        .catch((error) => {
          res.status(404).json({ message: "Problems" });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "Username allready exists." });
    });
});

export default router;
