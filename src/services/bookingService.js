import { reject } from "lodash";
import db from "../models/index";
import { emit } from "nodemon";

let createAppointmentService = (data) => {
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
            console.log("check customer: ", customer);
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
                },
                raw: true,
            })
            if (created) {
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
let confirmScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    token: data.token,
                },
                raw: true,
            })
            if (booking && booking.statusId === "S1") {
                await db.booking.update({
                    statusId: "S2",
                }, {
                    where: {
                        doctorId: booking.doctorId,
                        token: booking.token,
                    }
                })
                resolve({
                    errCode: 200,
                    message: "You have successfully confirmed"
                })
            } else if (booking && booking.statusId === "S2") {
                resolve({
                    errCode: 200,
                    message: "You have already confirmed"
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "Your appointment schedule does not exist"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createAppointmentService: createAppointmentService,
    confirmScheduleService: confirmScheduleService,
}