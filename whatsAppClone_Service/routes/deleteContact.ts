import express from "express";
import { Client } from "pg";
const router = express.Router();
import { getDb } from "../db";

function checkIfExists(id: any, user: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    db.query("SELECT * FROM contact WHERE id = $1 AND users_contact = $2;", [
      id,
      user,
    ])
      .then((data: any) => {
        if ((data.rowCount = 1)) {
          resolve();
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.log("No one with this id found in DB");
      });
  });
}

router.delete("/:id/:user", (req, res) => {
  let id = req.params.id;
  let user = req.params.user;
  let db = getDb();
  checkIfExists(id, user, db)
    .then(() => {
      db.query("DELETE FROM contact WHERE id = $1", [id])
        .then((data: any) => {
          res.status(200).json({ message: "Deleted row" });
        })
        .catch((error: any) => {
          res.status(404).json({ message: "Could not be deleted." });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "There exists no entry with this id." });
    });
});

export default router;
