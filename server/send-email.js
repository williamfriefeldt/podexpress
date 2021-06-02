const nodemailer = require('nodemailer');

/**
 * @description - Send an email with query from the request and answer with success/fail response
 * @param {object} req - Query with email adress, header and text
 * @param {object} res - Resolve in success (object) or fail (string)
 */
const sendEmail = async (req, res) => {
  /* Allow cors headers */
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  /* Handle queries */
  const { email, header, text } = req.query;

  /* Create transporter object using SMTP transport */
  let transporter = nodemailer.createTransport({
    host: "mail.poddsok.nu",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "contact@poddsok.nu", 
      pass: "Nybrogatan57a", 
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // Send mail 
  await transporter.sendMail({
    from: email, // sender address
    to: "william.friefeldt@gmail.com", // list of receivers
    subject: header, // Subject line
    text: text, // plain text body
    html: text, // html body
  }, (error, info) => {
            if (error) {
                console.log('Error:')
                console.log(error.message);
                res.json('Något gick fel: ' + error.message);
                return;
            }
            console.log('Success!')
            console.log(info.messageId); 
            const sucessData = {
              sent: true,
              mailID: info.messageId
            };
            res.json( sucessData );
            done();
        });
};

module.exports = sendEmail;