import express from "express";
import { getDb } from "../db";
const router = express.Router();

router.get("/", (req, res) => {
  let db = getDb();
  db.query("SELECT * FROM photo;")
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
