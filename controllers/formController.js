import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { FORM_MESSAGES, SERVER_MESSAGES } from "../utils/messages/messages.js";

// CONSTANTS
//const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEFORMDB,
  UPDATEFORMDB,
  DELETEFORMDB,
  READFORMDB,
} from "./database/formDatabase.js";

const createForm = async (req, res) => {
  try {
    const {id, name, email, phone, course, yearOfStudy, upesStudent, sapID, csaMember, csaID, paidEvent, transactionID, transactionImgURL, created_at, updated_at} = req.body;
    const query = { name };

    const formExists = await READFORMDB(query, fields);
    if (formExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(FORM_MESSAGES.FORM_ALREADY_EXISTS);
    }


    //const formImageURL = `${SERVER_URI}/images/forms/${req.files["formImg"][0].filename}`;

    const form = await CREATEFORMDB({
      id, 
      name, 
      email, 
      phone, 
      course,
      yearOfStudy, 
      upesStudent, 
      sapID, 
      csaMember, 
      csaID, 
      paidEvent, 
      transactionID, 
      transactionImgURL, 
      created_at, 
      updated_at,
    });

    if (form) {
      console.log(FORM_MESSAGES.FORM_CREATED, { form });
      return res.status(StatusCodes.CREATED).send({
        response: FORM_MESSAGES.FORM_CREATED,
        formId: form._id,
      });
    } else {
      console.log(FORM_MESSAGES.ERROR_CREATING_FORM, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(FORM_MESSAGES.ERROR_CREATING_FORM, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readForm = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const form = await READFORMDB(query, fields);

    if (form.length > 0) {
      console.log(FORM_MESSAGES.FORM_FOUND, { form });

      return res.status(StatusCodes.OK).send(form);
    } else {
      console.log(FORM_MESSAGES.FORM_NOT_FOUND, { form });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(FORM_MESSAGES.FORM_NOT_FOUND);
    }
  } catch (error) {
    console.log(FORM_MESSAGES.ERROR_READING_FORM, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateForm = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const updated = await UPDATEFORMDB(query, data, fields);
    if (updated) {
      console.log(FORM_MESSAGES.FORM_UPDATED, { updated });
      return res.status(StatusCodes.OK).send(updated);
    } else {
      console.log(FORM_MESSAGES.FORM_NOT_UPDATED, { updated });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(FORM_MESSAGES.FORM_NOT_UPDATED);
    }
  } catch (error) {
    console.log(FORM_MESSAGES.ERROR_UPDATING_FORM, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteForm = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const deleted = await DELETEFORMDB(query);
    if (deleted) {
      console.log(FORM_MESSAGES.FORM_DELETED, { deleted });
      return res.status(StatusCodes.OK).send(FORM_MESSAGES.FORM_DELETED);
    } else {
      console.log(FORM_MESSAGES.FORM_NOT_DELETED, { deleted });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(FORM_MESSAGES.FORM_NOT_DELETED);
    }
  } catch (error) {
    console.log(FORM_MESSAGES.ERROR_DELETING_FORM, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createForm as CREATEFORM,
  readForm as READFORM,
  updateForm as UPDATEFORM,
  deleteForm as DELETEFORM,
};
