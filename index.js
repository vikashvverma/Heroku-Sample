var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/sendemail', function(request, response) {


  // api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
  var options = {
      auth: {
          api_key: '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'
      }
  }
  var mailer = nodemailer.createTransport(sgTransport(options));
    var email = {
      to: ['ashok@civimechengineering.com'],
      bcc:['vermavikash014@gmail.com'],
      from: request.query.name+"<"+request.query.email+">",
      subject: request.query.subject,
      text: request.query.message
    };
    mailer.sendMail(email, function(err, res) {
        if (err) {
          console.log(err);
          return response.json({success:false,error:true,message:"Couldn't send email!"})
        }
        response.json({success:true,error:false,message:"Your message has been successfully sent!"})
    });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
