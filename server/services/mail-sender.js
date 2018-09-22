import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import config from '../config/keys';
import contact from './email-templates/contact';
import register from './email-templates/register';

const transporter = nodemailer.createTransport(config.MAIL_CONFIG);

export const INVITE_EMAIL = 'INVITE_EMAIL';
export const INITIATIVE_CONTACT_EMAIL = 'INITIATIVE_CONTACT_EMAIL';
export const USER_REGISTER_EMAIL = 'USER_REGISTER_EMAIL';

const sendEmail = (mailOptions) => new Promise((resolve, reject) => {
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info);
    if (error) return reject();
    return resolve();
  });
});

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
        html: `<a href="${config.HOST}/api/invite?jwt=${token}">invitation</a>:`,
      };

      return sendEmail(mailOptions);
    }
    case INITIATIVE_CONTACT_EMAIL: {
      const { email: contactEmail, title, content } = data;
      const mailOptions = {
        from: 'instudy',
        to: email,
        subject: `Instudy: ${title}`,
        html: contact(contactEmail, title, content),
      };

      return sendEmail(mailOptions);
    }
    case USER_REGISTER_EMAIL: {
      const { name } = data;
      const mailOptions = {
        from: 'instudy',
        to: email,
        subject: `Instudy - wiadomość z portalu`,
        html: register(name),
      };

      return sendEmail(mailOptions);
    }
    default: {

    }
  }
};
