import { ALUMNIMODEL } from "../../models/alumniModel.js";
import { ALUMNI_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createAlumniDB = async (data) => {
    try {
        const result = await ALUMNIMODEL(data).save();
        if (result !== null) {
            console.log(ALUMNI_MESSAGES.ALUMNI_CREATED, {
                userId: result._id,
            });
            return result;
        } else {
            console.log(ALUMNI_MESSAGES.ALUMNI_NOT_CREATED);
            return false;
        }
    } catch (error) {
        console.log(ALUMNI_MESSAGES.ERROR_CREATING_ALUMNI, (data, error));
        return false;
    }
};

const readAlumniDB = async (query, fields) => {
    try {
        const result = await ALUMNIMODEL.find(query).select(fields);
        if (result.length > 0) {
            console.log(ALUMNI_MESSAGES.ALUMNI_READ);
            return result;
        } else {
            console.log(ALUMNI_MESSAGES.ALUMNI_NOT_READ);
            return false;
        }
    } catch (error) {
        console.log(ALUMNI_MESSAGES.ERROR_READING_ALUMNI, {
            query,
            error,
        });
        return false;
    }
};

const updateAlumniDB = async (query, data, fields) => {
    try {
        const result = await ALUMNIMODEL.findOneAndUpdate(query, data, {
            new: true,
        }).select(fields);
        if (result) {
            console.log(ALUMNI_MESSAGES.ALUMNI_UPDATED, {
                userId: result,
            });
            return result;
        } else {
            console.log(ALUMNI_MESSAGES.ALUMNI_NOT_UPDATED, {
                userId: result,
            });
            return false;
        }
    } catch (error) {
        console.log(ALUMNI_MESSAGES.ERROR_UPDATING_ALUMNI, (query, data, error));
        return false;
    }
};

const deleteAlumniDB = async (query) => {
    try {
        const result = await ALUMNIMODEL.findOneAndDelete(query);

        if (result) {
            console.log(ALUMNI_MESSAGES.ALUMNI_DELETED, {
                userId: result._id,
            });
            return result;
        } else {
            console.log(ALUMNI_MESSAGES.ALUMNI_NOT_DELETED, {
                userId: result._id,
            });
            return false;
        }
    } catch (error) {
        console.log(ALUMNI_MESSAGES.ERROR_DELETING_ALUMNI, (query, error));
        return false;
    }
};

// EXPORTING MODULES

export {
    createAlumniDB as CREATEALUMNIDB,
    readAlumniDB as READALUMNIDB,
    updateAlumniDB as UPDATEALUMNIDB,
    deleteAlumniDB as DELETEALUMNIDB,
};
