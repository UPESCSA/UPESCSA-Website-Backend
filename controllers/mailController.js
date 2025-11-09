// import dotenv from "dotenv";
// import { SENDMAIL } from "../utils/mailer.js";
// import { StatusCodes } from "http-status-codes";
// import { MAIL_MESSAGES, REGISTRATION_MESSAGES } from "../utils/messages/messages.js";
// dotenv.config();

// const sendEmail = async (req, res) => {
//     try {
//         const { name, email, template } = req.body;
//         if (name) {
//             console.log(name, email, template);
//             SENDMAIL(name, email, template);
//             return res.status(StatusCodes.CREATED).send({
//                 response: MAIL_MESSAGES.MAIL_SEND,
//             });

//         }
//         else {
//             console.log(MAIL_MESSAGES.MAIL_NOT_SEND, { error })
//             return res
//                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
//                 .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
//         }
//     }
//     catch (error) {
//         console.log(error)
//         return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
//     }
// };

// export {
//     sendEmail as SENDEMAIL,
// };

import dotenv from "dotenv";
import { SENDMAIL } from "../utils/mailer.js";
import { StatusCodes } from "http-status-codes";
import { MAIL_MESSAGES, REGISTRATION_MESSAGES } from "../utils/messages/messages.js";

dotenv.config();

const sendEmail = async (req, res) => {
  try {
    const { name, email, template } = req.body;

    if (name && email && template) {


      console.log("Sending email to:", email, "with template:", template);


      await SENDMAIL(name, email, template);

      return res.status(StatusCodes.CREATED).send({
        response: MAIL_MESSAGES.MAIL_SEND,
      });
    } else {
      console.log("Missing fields:", { name, email, template });
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: MAIL_MESSAGES.MAIL_NOT_SEND });
    }
  } catch (error) {
    console.error("SendEmail error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal Server Error" });
  }
};

export { sendEmail as SENDEMAIL };
