import express from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/", (req, res) => {
    let db = getDb();

    db.query(
        "SELECT MAX(id) FROM contact;")
        .then((data) => {
            if (data.rowCount == 1) {
                res.status(200).json(data.rows[0].max);
          } else {
            res.status(404).json({ message: "No contact with this Max id found." });
          }
        })
        .catch((error) => {
          res.status(400).json({ message: "Error while query." });
        });
});

export default router;