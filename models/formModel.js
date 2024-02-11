import mongoose from "mongoose";
import moment from "moment-timezone";

const formSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: String,
    required: true,
  },
  upesStudent: {
    type: String,
    required: true,
  },
  sapId: {
    type: String,
    required: true,
  },
  csaMember: {
    type: String,
    required: false,
  },
  csaID: {
    type: String,
    required: false,
  },
  paidEvent: {
    type: String,
    required: true,
  },
  transactionID: {
    type: String,
    required: true,
  },
  transactionImgURL: {
    type: String,
    required: true,
  },
  created_at: {
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

const formModel = mongoose.model("form", formSchema);

export { formModel as FORMMODEL };
