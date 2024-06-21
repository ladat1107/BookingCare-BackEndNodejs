import { Model, where } from "sequelize";
import db from "../models/index"

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
                    exclude: ["password", "image"]
                },
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
                where: { id: doctorId },
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
            if (!data || !data.htmlContent || !data.markDownContent || !data.doctorId || !data.clinicId || !data.specialtyId || !data.action) {
                return res.status(400).json({
                    errCode: 400,
                    message: "Input is Empty!"
                })
            } else {
                console.log("check data", data)
                if (checkDoctorId(data.doctorId)) {
                    if (data.action == "CREATE") {
                        await db.Markdown.create({
                            htmlContent: data.htmlContent,
                            markDownContent: data.markDownContent,
                            description: data.description,
                            doctorId: data.doctorId,
                            clinicId: data.clinicId,
                            specialtyId: data.specialtyId,
                        })
                    } else {
                        // let markDown = await db.markDown.findOne({
                        //     where: {
                        //         doctorId: data.doctorId,
                        //     }
                        // })
                        // if (markDown) { }
                        await db.Markdown.update({
                            htmlContent: data.htmlContent,
                            markDownContent: data.markDownContent,
                            description: data.description,
                            doctorId: data.doctorId,
                            clinicId: data.clinicId,
                            specialtyId: data.specialtyId,
                        }, {
                            where: {
                                doctorId: data.doctorId,
                            }
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
                    exclude: ["password", "image"]
                },
                include: [
                    { model: db.Markdown, attributes: ["description", "markDownContent", "htmlContent", "doctorId"] },
                ],
                raw: true,
                nest: true,
            });
            if (doctor) {
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
module.exports = {
    getTopDoctorService: getTopDoctorService,
    getAllDoctorService: getAllDoctorService,
    createPageDoctorService: createPageDoctorService,
    getDoctorMardownService: getDoctorMardownService,
}