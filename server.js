const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES({ region: 'eu-west-1' })
    });
        
    await transporter.sendMail({
      from: 'Wolfgang Digital <fionn@wolfgangdigital.com>',
      to: 'Digital_Team_Ireland@zurich.com',
      subject: 'New Lead | CoE Benchmark Tool',
      text: `A new user has completed the tool.\n\nEmail: ${data.email}\nOpted in to recieve communications: ${data.optIn ? 'Yes' : 'No'}`
    });
        
    return {
      statusCode: 202,
      headers: {
        'Access-Control-Allow-Headers': 'ContentType',
        'Access-Control-Allow-Origin': 'https://zurich-benchmark-2023-76da8ca19c80.herokuapp.com'
      }
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Headers': 'ContentType',
        'Access-Control-Allow-Origin': 'https://zurich-benchmark-2023-76da8ca19c80.herokuapp.com'
      }
    };
  }
};