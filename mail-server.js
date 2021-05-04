const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");

// App
const app = express();

// Set port
app.set("port", 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Mail request
app.get("/send_mail", async (req, res) => {
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
      user: "kontakt@poddsok.nu", 
      pass: "nybrogatan57a", 
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // Send mail 
  await transporter.sendMail({
    from: email, // sender address
    to: "kontakt@poddsok.nu", // list of receivers
    subject: header, // Subject line
    text: text, // plain text body
    html: "<b>Hello world?</b>", // html body
  }, (error, info) => {
            if (error) {
                console.log(error.message);
                res.json('Något gick fel: ' + error.message);
                return;
            }
            console.log(info.messageId);
            const sucessData = {
              sent: true,
              mailID: info.messageId
            };
            res.json( sucessData );
            done();
        });
});

// Server
app.listen(5000, () => console.log(`Server running on localhost:${5000}`));


