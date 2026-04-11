const mongoose = require("mongoose");

const ParticipantsSchema = new mongoose.Schema(
  {
    name: {
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
    division: {
      type: String,
      required: true,
      enum: ["Division 1", "Division 2", "Learner Track", "Pro Track"],
    },
    class: {
      type: String,
      enum: [
        "BTCS",
        "TTCS-A",
        "TTCS-B",
        "TTCS-C",
        "STCS-A",
        "STCS-B",
        "STCS-C",
        "FT-1",
        "FT-2",
        "FT-3",
        "FT-4",
      ],
    },
    class_roll_no: {
      type: Number,
      required: true,
    },
    hackerrank_username: {
      type: String,
      required: true,
    },
    participated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const participantsModel = mongoose.model(
  "CodeClashParticipants",
  ParticipantsSchema
);

module.exports = participantsModel;
