const _ = require("lodash");
const Participants = require("../model/participants");
const { runBackgroundJobs } = require("../utils/jobs");

const createParticipants = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      division,
      standard,
      class_roll_no,
      hackerrank_username,
      screenshotUrl,
    } = req.body;
    // Registration are open

    if (
      _.isNil(name) ||
      _.isNil(email) ||
      _.isNil(phone) ||
      _.isNil(division) ||
      _.isNil(standard) ||
      _.isNil(class_roll_no) ||
      _.isNil(hackerrank_username)
    ) {
      return res.send({
        status: 400,
        success: false,
        message: "Mandatory fields are missing",
        data: {},
      });
    }

    let fullHackerrankUrl = hackerrank_username.trim();

    // Type check validation
    if (!fullHackerrankUrl.startsWith("https://www.hackerrank.com/profile/")) {
      return res.send({
        status: 400,
        success: false,
        message: "HackerRank ID must be a valid URL starting with https://www.hackerrank.com/profile/",
        data: {},
      });
    }

    fullHackerrankUrl = fullHackerrankUrl.split("?")[0]; // remove query params if any

    const existingParticipant = await Participants.findOne({
      $or: [{ email }, { hackerrank_username: fullHackerrankUrl }],
    });

    if (!_.isNil(existingParticipant)) {
      const isEmail = existingParticipant.email === email;
      return res.send({
        status: 400,
        success: false,
        message: isEmail
          ? "Participant with this email already exists"
          : "Participant with this HackerRank username already exists",
        data: {},
      });
    }

    const participants = await Participants.create({
      email,
      name,
      class_roll_no,
      class: standard,
      division,
      phone,
      hackerrank_username: fullHackerrankUrl,
    });

    // Send the exact payload format the frontend originally sent to Google Script
    const googleSheetPayload = {
      name,
      email,
      phone,
      division,
      standard,
      class_roll_no,
      screenshotUrl,
      hackerrank_username: fullHackerrankUrl,
    };

    // Fire background jobs asynchronously (do not await)
    runBackgroundJobs(googleSheetPayload);

    return res.send({
      status: 200,
      success: true,
      message: "Participants created successfully",
      data: participants,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      success: false,
      message: "Error creating participants",
      data: {},
    });
  }
};

module.exports = { createParticipants };
