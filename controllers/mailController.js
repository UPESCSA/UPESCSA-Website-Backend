import dotenv from "dotenv";
import { SENDMAIL } from "../utils/mailer.js";
import { StatusCodes } from "http-status-codes";
import { REGISTRATION_MESSAGES } from "../utils/messages/messages.js";
dotenv.config();

const sendEmail = async (req, res) => {
    const { name, email, template } = req.body;
    if (name) {
        console.log(name, email, template);
        SENDMAIL(name, email, template);
        return res.status(StatusCodes.CREATED).send({
            response: REGISTRATION_MESSAGES.REGISTRATION_CREATED,
        });

    }

};

export {
    sendEmail as SENDEMAIL,
};