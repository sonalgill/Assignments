const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    user: {
      type: objectId,
      ref: 'user'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);
