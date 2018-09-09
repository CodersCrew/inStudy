import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import config from '../config/keys';

const transporter = nodemailer.createTransport(config.MAIL_CONFIG);

export const INVITE_EMAIL = 'INVITE_EMAIL';

export default (email, kind, data) => {
  switch (kind) {
    case INVITE_EMAIL: {
      const { initiativeID } = data;
      console.log(initiativeID);
      const token = jwt.sign({ initiativeID }, config.cookieKey);
      const mailOptions = {
        from: 'instudy',
        to: email,
        subject: 'zapro',
        text: 'fdssfsdfsd',
        html: `<a href="${config.HOST}/api/invite?jwt=${token}">invitation</a>:`,
      };
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          console.log(error, info);
          if (error) return reject();
          return resolve();
        });
      });
    }
    default: {

    }
  }
};
