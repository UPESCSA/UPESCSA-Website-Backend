import mongoose from "mongoose";
import moment from "moment-timezone";

const alumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    linkedInURL: {
        type: String,
        required: true,
    },
    alumniImgURL: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => moment().tz("Asia/Kolkata").toDate(),
        required: true,
    },
    updated_at: {
        type: Date,
        default: () => moment().tz("Asia/Kolkata").toDate(),
        required: false,
    },
});

const alumniModel = mongoose.model("alumni", alumniSchema);

export { alumniModel as ALUMNIMODEL };
