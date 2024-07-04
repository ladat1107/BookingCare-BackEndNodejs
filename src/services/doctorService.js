import { Model, where } from "sequelize";
import db from "../models/index";
require('dotenv').config();
import _, { includes, reject } from "lodash"
import { raw } from "body-parser";
const maxNumber = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = {};
            doctor = await db.User.findAll({
                where: { roleId: "R2" },
                limit: limitInput,
                attributes: {
                    exclude: ["password",]
                },
                include: [
                    { model: db.allcodes, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.allcodes, as: "roleData", attributes: ["valueEn", "valueVi"] },
                ],
                raw: true,
                nest: true,
            });
            if (doctor) {
                resolve({
                    errCode: 0,
                    message: "OK",
                    doctor: doctor,
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Failed",
                    doctor: null,
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}
let getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = {};
            doctor = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password"]
                },
                // raw: true,
                // nest: true,
            });
            if (doctor) {
                resolve({
                    errCode: 0,
                    message: "OK",
                    doctor: doctor,
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Failed",
                    doctor: null,
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let checkDoctorId = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = {};
            doctor = await db.User.findAll({
                where: { id: doctorId, roleId: "R2" },
                attributes: {
                    exclude: ["password", "image"]
                },

            })
            if (doctor) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let createPageDoctorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.htmlContent || !data.markDownContent || !data.doctorId || !data.action) {
                return res.status(400).json({
                    errCode: 400,
                    message: "Input is Empty!"
                })
            } else {
                if (checkDoctorId(data.doctorId)) {
                    if (data.action == "CREATE") {
                        await db.Markdown.create({
                            htmlContent: data.htmlContent,
                            markDownContent: data.markDownContent,
                            description: data.description,
                            doctorId: data.doctorId,

                        })
                    } else {
                        await db.Markdown.update({
                            htmlContent: data.htmlContent,
                            markDownContent: data.markDownContent,
                            description: data.description,
                            doctorId: data.doctorId,

                        }, {
                            where: {
                                doctorId: data.doctorId,
                            }
                        })
                    }
                    let doctorInfo = await db.Doctor_info.findOne({
                        where: { doctorId: data.doctorId }
                    })
                    if (doctorInfo) {
                        await db.Doctor_info.update({
                            note: data.note,
                            addressClinic: data.addressClinic,
                            nameClinic: data.nameClinic,
                            paymentId: data.paymentId,
                            provinceId: data.provinceId,
                            priceId: data.priceId,
                            specialtyId: data.specialtyId ? data.specialtyId : '',
                            clinicId: data.clinicId ? data.clinicId : '',
                        }, {
                            where: {
                                doctorId: data.doctorId,
                            }
                        })
                    } else {
                        await db.Doctor_info.create({
                            note: data.note,
                            addressClinic: data.addressClinic,
                            nameClinic: data.nameClinic,
                            paymentId: data.paymentId,
                            provinceId: data.provinceId,
                            priceId: data.priceId,
                            doctorId: data.doctorId,
                            specialtyId: data.specialtyId ? data.specialtyId : '',
                            clinicId: data.clinicId ? data.clinicId : '',
                        })
                    }
                    resolve({
                        errCode: 201,
                        message: "OK",
                    })
                } else {
                    resolve({
                        errCode: 400,
                        message: "Doctor not found",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getDoctorMardownService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findOne({
                where: { id: doctorId },
                attributes: {
                    exclude: ["password"]
                },
                include: [
                    { model: db.Markdown, attributes: ["description", "markDownContent", "htmlContent", "doctorId"] },
                    { model: db.allcodes, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.allcodes, as: "roleData", attributes: ["valueEn", "valueVi"] },
                    {
                        model: db.Doctor_info,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt", "doctorId",]
                        },
                        include: [
                            { model: db.allcodes, as: "priceData", attributes: ["valueEn", "valueVi"] },
                            { model: db.allcodes, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                            { model: db.allcodes, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                            { model: db.specialty, as: "specialtyData", attributes: ["name", "id"] },
                            { model: db.clinic, as: "clinicData", attributes: ["name", "id"] },
                        ],
                        raw: true,
                        nest: true,
                    },
                ],
                raw: true,
                nest: true,
            });
            if (doctor) {
                let imageBase64 = "https://png.pngtree.com/png-clipart/20211009/original/pngtree-cute-boy-doctor-avatar-logo-png-image_6848835.png";
                if (doctor.image) {
                    imageBase64 = new Buffer(doctor.image, "base64").toString("binary")
                }
                doctor.image = imageBase64;
                resolve({
                    errCode: 201,
                    message: "OK",
                    doctor: doctor,
                })
            } else {
                resolve({
                    errCode: 400,
                    message: "Doctor not found",
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let customComparator = (obj1, obj2) => {
    return obj1.timeType === obj2.timeType;
}
let checkEmptyObject = (obj1) => {
    obj1.forEach(item => {
        if (!item.doctorId || !item.date || !item.timeType) {
            return false;
        }
    });
    return true;
}
let createScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!checkEmptyObject(data)) {
                resolve({
                    errCode: 400,
                    message: "Input is Empty!"
                })
            }
            let schedule = await db.schedule.findAll({
                where: {
                    doctorId: data[0].doctorId,
                    date: data[0].date,
                },
                attributes: ["doctorId", "date", "timeType"]
            })

            let difference = _.differenceWith(data, schedule, customComparator);
            if (difference && difference.length > 0) {
                difference = difference.map(item => ({ ...item, maxNumber: maxNumber }))
                await db.schedule.bulkCreate(difference)
                resolve({
                    errCode: 201,
                    message: "OK",
                })
            } else {
                resolve({
                    errCode: 400,
                    message: "Schedule is not empty",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getScheduleDoctorByDateService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = await db.schedule.findAll({
                where: {
                    doctorId: +data.doctorId,
                    date: +data.date,
                },
                include: {
                    model: db.allcodes, as: "timeData", attributes: ["valueEn", "valueVi"]
                },
                raw: true,
                nest: true,
            })
            if (schedule) {
                resolve({
                    errCode: 201,
                    message: "OK",
                    schedule: schedule,
                })
            } else {
                resolve({
                    errCode: 400,
                    message: "Schedule not found",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getTopDoctorService: getTopDoctorService,
    getAllDoctorService: getAllDoctorService,
    createPageDoctorService: createPageDoctorService,
    getDoctorMardownService: getDoctorMardownService,
    createScheduleService: createScheduleService,
    getScheduleDoctorByDateService: getScheduleDoctorByDateService,
}