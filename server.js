const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': 'https://www.zurich.ie',
  };

  try {
    const data = JSON.parse(event.body);
    
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES({ region: 'eu-west-1' })
    });
        
    await transporter.sendMail({
      from: 'Wolfgang Digital <fionn@wolfgangdigital.com>',
      to: 'Digital_Team_Ireland@zurich.com',
      subject: 'New Lead | CoE Benchmark Tool',
      text: `A new user has completed the tool.\n\nEmail: ${data.email}\nOpted in to receive communications: ${data.optIn ? 'Yes' : 'No'}`,
    });

    return {
      statusCode: 202,
      headers: headers,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: headers,
    };
  }
};
