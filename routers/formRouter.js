import express from "express";

import {
  CREATEFORM,
  UPDATEFORM,
  READFORM,
  DELETEFORM,
} from "../controllers/formController.js";

const FORMRouter = express.Router();

FORMRouter.route("/")
  .get(READFORM)
  .post(CREATEFORM)
  .put(UPDATEFORM)
  .delete(DELETEFORM);

export { FormRouter as FORMROUTER };
