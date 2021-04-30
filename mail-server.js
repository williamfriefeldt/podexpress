const express = require('express');
const nodemailer = require("nodemailer");

// App
const app = express();

// Set port
app.set("port", 5000);

// Mail request
app.get("/send_mail", async (req, res) => {

  /* Allow cors headers */
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
  console.log('Get request');

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.poddsok.nu",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "kontakt@poddsok.nu", // generated ethereal user
      pass: "Bajsapa123", // generated ethereal password
    },
  });

  console.log('Transport created');

  // Send mail 
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <kontakt@poddsok.nu>', // sender address
    to: "kontakt@poddsok.nu", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }, (error, info) => {
            if (error) {
                res.json('Något gick fel: ' + error.message);
                return;
            }
            res.json('Emailet har skickats med id: ' + info.messageId);
            done();
        });

});

// Server
app.listen(5000, () => console.log(`Server running on localhost:${5000}`));


