import { FORMMODEL } from "../../models/formModel.js";
import { FORM_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createFormDB = async (data) => {
  try {
    const result = await FORMMODEL(data).save();
    if (result !== null) {
      console.log(FORM_MESSAGES.FORM_CREATED, { formId: result._id });
      return result;
    } else {
      console.log(FORM_MESSAGES.FORM_NOT_CREATED, { formId: result._id });
      return false;
    }
  } catch (error) {
    console.log(FORM_MESSAGES.FORM_CREATING_FORM, (data, error));
    return false;
  }
};

const readFormDB = async (query, fields) => {
  try {
    const result = await FORMMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(FORM_MESSAGES.FORM_READ);
      return result;
    } else {
      console.log(FORM_MESSAGES.FORM_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(FORM_MESSAGES.ERROR_READING_FORM, {
      query,
      error,
    });
    return false;
  }
};

const updateFormDB = async (query, data, fields) => {
  try {
    const result = await FORMMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(FORM_MESSAGES.FORM_UPDATED, { formId: result._id });
      return result;
    } else {
      console.log(FORM_MESSAGES.FORM_NOT_UPDATED, { formId: result._id });
      return false;
    }
  } catch (error) {
    console.log(FORM_MESSAGES.ERROR_UPDATING_FORM, (query, data, error));
    return false;
  }
};

const deleteFormDB = async (query) => {
  try {
    const result = await FORMMODEL.findOneAndDelete(query);

    if (result) {
      console.log(FORM_MESSAGES.FORM_DELETED, { formId: result._id });
      return result;
    } else {
      console.log(FORM_MESSAGES.FORM_NOT_DELETED, { formId: result._id });
      return false;
    }
  } catch (error) {
    console.log(FORM_MESSAGES.ERROR_DELETING_FORM, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createFormDB as CREATEFORMDB,
  readFormDB as READFORMDB,
  updateFormDB as UPDATEFORMDB,
  deleteFormDB as DELETEFORMDB,
};
