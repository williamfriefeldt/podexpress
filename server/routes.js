const express = require('express');
const sendEmail = require("./send-email");

/**
 * @description - Initiate router
 */
const router = express.Router();

/**
 * @description - Send email router
 */
router.get('/send_email', sendEmail);

/**
 * @description - Export router to application
 */
module.exports = router;