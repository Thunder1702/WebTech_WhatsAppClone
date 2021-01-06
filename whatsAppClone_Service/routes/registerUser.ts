import express from "express";
import { Client } from "pg";
const router = express.Router();
import { getDb } from "../db";

function checkValidity(user: any, db: Client) {
  let pr = new Promise<void>((resolve, reject) => {
    if (
      typeof user.name === "string" &&
      typeof user.pasword === "string" &&
      typeof user.email === "string"
    ) {
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
  return pr;
}
// {
//   "name": "dilli",
//   "pasword": "test",
//   "email": "dilli@mail.com"
// }

router.post("/", (req, res) => {
  let user = req.body;

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
