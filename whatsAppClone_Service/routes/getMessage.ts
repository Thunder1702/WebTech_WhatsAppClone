import express from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/:id/:user", checkAuth,(req, res) => {
  let db = getDb();
  let id = req.params.id;
  let user = req.params.user;

  db.query(
    "SELECT * FROM message WHERE id = $1 AND (message_to = $2 OR message_from = $3);",
    [id, user, user]
  )
    .then((data) => {
      if (data.rowCount > 0) {
        res.status(200).json(data.rows);
      } else {
        res.status(404).json({ message: "No message with this id found." });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "Error while query." });
    });
});

export default router;
