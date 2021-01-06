import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const privateKEY = fs.readFileSync(
  path.join(__dirname, "../private.key"),
  "utf8"
);

const router = express.Router();
import { getDb } from "../db";

router.post("/", (req, res) => {
  let user = req.body;
  let db = getDb();

  db.query("SELECT * FROM users WHERE name = $1 AND password = $2;", [
    user.name,
    user.password,
  ])
    .then((data: any) => {
      if ((data.rowCount = 1)) {
        const token = jwt.sign(
          {
            user: user.name,
          },
          privateKEY,
          {
            expiresIn: "1h",
          }
        );

        res.json({
          token: token,
        });
      } else {
        res.status(404).json({ message: "false" });
      }
    })
    .catch((error: any) => {
      res.status(400).json({ message: "ERROR" });
    });
});

export default router;
