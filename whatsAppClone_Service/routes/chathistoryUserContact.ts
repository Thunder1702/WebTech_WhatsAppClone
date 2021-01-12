import express from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/:id",checkAuth, (req: any, res) => {
  let db = getDb();
  let user = req.user.username;
  console.log(user);
  let contactId = req.params.id;
  db.query(
    "SELECT m.message_text,m.message_to,m.message_from FROM contact c, message m WHERE c.users_contact = $1 AND c.id = $2 AND ((m.message_to = $3 AND m.message_from = $4) OR (m.message_to = $5 AND m.message_from = $6));",
    [user, contactId, user, contactId, contactId, user]
  )
    .then((data) => {
      if (data.rowCount > 0) {
        res.status(200).json(data.rows);
      } else {
        res.status(404).json({ message: "No contact found." });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "ERROR" });
    });
});

export default router;
