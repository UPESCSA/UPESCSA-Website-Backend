import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import {
  ALUMNI_MESSAGES,
  SERVER_MESSAGES,
} from "../utils/messages/messages.js";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEALUMNIDB,
  UPDATEALUMNIDB,
  DELETEALUMNIDB,
  READALUMNIDB,
} from "./database/alumniDatabase.js";

const createAlumni = async (req, res) => {
  try {
    const { name, position, company, linkedInURL } = req.body;
    const query = { linkedInURL };

    const AlumniExists = await READALUMNIDB(query, fields);
    if (AlumniExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(ALUMNI_MESSAGES.ALUMNI_ALREADY_EXISTS);
    }

    const alumniImgURL = `${SERVER_URI}/images/alumni/${req.files["alumniImg"][0].filename}`;

    const alumni = await CREATEALUMNIDB({
      name,
      position,
      company,
      alumniImgURL,
      linkedInURL,
    });

    if (alumni) {
      console.log(ALUMNI_MESSAGES.ALUMNI_CREATED, {
        alumni,
      });
      return res.status(StatusCodes.CREATED).send({
        response: ALUMNI_MESSAGES.ALUMNI_CREATED,
        alumniId: alumni._id,
      });
    } else {
      console.log(ALUMNI_MESSAGES.ERROR_CREATING_ALUMNI, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(ALUMNI_MESSAGES.ERROR_CREATING_ALUMNI, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readAlumni = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const read = await READALUMNIDB(query, fields);

    if (read.length > 0) {
      console.log(ALUMNI_MESSAGES.ALUMNI_FOUND, {
        read,
      });

      return res.status(StatusCodes.OK).send(read);
    } else {
      console.log(ALUMNI_MESSAGES.ALUMNI_NOT_FOUND, {
        read,
      });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ALUMNI_MESSAGES.ALUMNI_NOT_FOUND);
    }
  } catch (error) {
    console.log(ALUMNI_MESSAGES.ERROR_READING_ALUMNI, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateAlumni = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const updated = await UPDATEALUMNIDB(query, data, fields);
    if (updated) {
      console.log(ALUMNI_MESSAGES.ALUMNI_UPDATED, {
        updated,
      });
      return res.status(StatusCodes.OK).send(updated);
    } else {
      console.log(ALUMNI_MESSAGES.ALUMNI_NOT_UPDATED, {
        updated,
      });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ALUMNI_MESSAGES.ALUMNI_NOT_UPDATED);
    }
  } catch (error) {
    console.log(ALUMNI_MESSAGES.ERROR_UPDATING_ALUMNI, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteAlumni = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const deleted = await DELETEALUMNIDB(query);
    if (deleted) {
      console.log(ALUMNI_MESSAGES.ALUMNI_DELETED, {
        deleted,
      });
      return res.status(StatusCodes.OK).send(ALUMNI_MESSAGES.ALUMNI_DELETED);
    } else {
      console.log(ALUMNI_MESSAGES.ALUMNI_NOT_DELETED, {
        deleted,
      });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ALUMNI_MESSAGES.ALUMNI_NOT_DELETED);
    }
  } catch (error) {
    console.log(ALUMNI_MESSAGES.ERROR_DELETING_ALUMNI, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createAlumni as CREATEALUMNI,
  readAlumni as READALUMNI,
  updateAlumni as UPDATEALUMNI,
  deleteAlumni as DELETEALUMNI,
};
