import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const privateKEY = fs.readFileSync(
  path.join(__dirname, "../private.key"),
  "utf8"
);

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      console.log("header authorization not set");
      res.sendStatus(403);
      return;
    }
    // bearer <asdasdAsd>
    const token = req.headers.authorization.split(" ")[1];
    // throws error if invalid
    jwt.verify(token, privateKEY);
    next();
  } catch (err) {
    res.send(err.message);
  }
}
