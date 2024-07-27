import express from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
    CREATEALUMNI,
    UPDATEALUMNI,
    READALUMNI,
    DELETEALUMNI,
} from "../controllers/alumniController.js";

const alumniRouter = express.Router();

alumniRouter
    .route("/")
    .get(READALUMNI)
    .post(UPLOAD.fields([{ name: "alumniImg", maxCount: 1 }]), CREATEALUMNI)
    .put(UPDATEALUMNI)
    .delete(DELETEALUMNI);

export { alumniRouter as ALUMNIROUTER };
