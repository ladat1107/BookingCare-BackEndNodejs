import { reject } from "lodash";
import nodemailer from "nodemailer"
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import db from "../models/index";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_APP,//"ladat01626362980@gmail.com", //
        pass: process.env.PASSWORD_APP, //"ejtbekkdpxgngbrx" //
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

let sendEmailConform = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    password: '$2a$10$yGbYZ4fxE6jjOS/fK0KUtu4thy1xLMoIdBg8GOiMu0C5BfignmTZa',//password: 123
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    roleId: "R3",
                },
                raw: true,
            });
            //console.log("check customer: ", customer);
            let token = uuidv4();
            let [appointment, created] = await db.booking.findOrCreate({
                where: {
                    doctorId: data.doctorId,
                    patientId: customer[0].id,
                    date: data.date,
                },
                defaults: {
                    doctorId: data.doctorId,
                    patientId: customer[0].id,
                    date: data.date,
                    statusId: "S1",
                    timeType: data.timeType,
                    token: token
                },
                raw: true,
            })
            if (created) {
                let urlRedirect = `${process.env.REACT_APP_BACKEND_URL}/api/confirm-booking?token=${appointment.token}&doctorId=${data.doctorId}`;
                let info = await transporter.sendMail({
                    from: '"La đạt ca ca 👻" <ladat01626362980@gmail.com>', // sender address
                    to: `${data.email}`, // list of receivers
                    subject: "Xác nhận lịch hẹn✔", // Subject line
                    //text: "Hello world?", // plain text body
                    html: `<div style="width: 100%; padding: 20px; background-color: #ffffff; max-width: 600px; margin: 0 auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4CAF50; color: white; padding: 10px 0; text-align: center;">
            <h2>Appointment Confirmation</h2>
        </div>
        <div style="padding: 20px;">
            <h1>Hi ${data.lastName},</h1>
            <p>Thank you for booking an appointment with us. Here are the details of your appointment:</p>
            <p><strong>Doctor:</strong> Dr. ${data.doctorName}</p>
            <p><strong>Date:</strong> ${data.time}</p>
            <p><strong>Location:</strong> ${data.addressClinic}</p>
            <p>Please arrive 10 minutes early to complete any necessary paperwork.</p>
            <p>If you need to reschedule or cancel your appointment, please click the button below:</p>
            <a href="${urlRedirect}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;">Reschedule/Cancel Appointment</a>
            <p>We look forward to seeing you!</p>
            <p>Best regards,</p>
            <p>${data.nameClinic}</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #f4f4f4; color: #666666; font-size: 12px;">
            <p>&copy; 2024 [${data.nameClinic}]. All rights reserved.</p>
            <p>[${data.addressClinic}] | [0362322010]</p>
        </div>
    </div>`});
                resolve({
                    errCode: 200,
                    message: "OK"
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "You have an appointment today"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    sendEmailConform: sendEmailConform
}