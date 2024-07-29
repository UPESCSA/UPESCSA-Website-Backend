import dotenv from "dotenv";
import { SENDMAIL } from "../utils/mailer.js";
import { StatusCodes } from "http-status-codes";
import { MAIL_MESSAGES, REGISTRATION_MESSAGES } from "../utils/messages/messages.js";
dotenv.config();

const sendEmail = async (req, res) => {
    try {
        const { name, email, template } = req.body;
        if (name) {
            console.log(name, email, template);
            SENDMAIL(name, email, template);
            return res.status(StatusCodes.CREATED).send({
                response: MAIL_MESSAGES.MAIL_SEND,
            });

        }
        else {
            console.log(MAIL_MESSAGES.MAIL_NOT_SEND, { error })
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }
    catch (error) {
        console.log(error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};

export {
    sendEmail as SENDEMAIL,
};