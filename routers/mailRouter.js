import express from "express";

import {
    SENDEMAIL,
} from "../controllers/mailController.js";


const mailRouter = express.Router();

mailRouter
    .route("/")
    .post(SENDEMAIL)

export { mailRouter as MAILROUTER };
