import _, { includes, reject } from "lodash"
import db from "../models/index"
import clinic from "../models/clinic";
import { name } from "ejs";
import { where } from "sequelize";

let isDigit = (char) => {
    return !isNaN(char) && !isNaN(parseFloat(char));
}
let handleUpSertClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data: ", data);
            let [clinic, createClinic] = await db.clinic.findOrCreate({
                where: { name: data.nameClinic },
                defaults: {
                    name: data.nameClinic,
                    image: data.image,
                    address: data.address,
                },
                raw: true,
            })
            if (createClinic) {
                await db.Markdown.create({
                    htmlContent: data.htmlContent,
                    markDownContent: data.markDownContent,
                    clinicId: clinic.id,
                })
                resolve({
                    errCode: 200,
                    message: "OK",
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "Clinic already exists",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let handleUpdateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.clinic.findOne({
                where: {
                    id: data.clinicId,
                },
                raw: true,
            })
            if (clinic) {
                await db.clinic.update({
                    name: data.nameClinic,
                    image: data.image,
                    address: data.address,
                }, {
                    where: {
                        id: data.clinicId,
                    }
                })
                await db.Markdown.update({
                    htmlContent: data.htmlContent,
                    markDownContent: data.markDownContent,
                }, {
                    where: {
                        clinicId: data.clinicId,
                    }
                })
                resolve({
                    errCode: 200,
                    message: "OK",
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "Clinic not exists",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let handleGetClinicDoctorInfo = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check clinic: ", clinicId);
            if (clinicId) {
                let clinic = await db.clinic.findOne({
                    where: { id: clinicId },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                    include: [
                        {
                            model: db.Doctor_info, as: "clinicData",
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            },
                            include: [
                                { model: db.allcodes, as: "priceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.allcodes, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.allcodes, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                                {
                                    model: db.User, attributes: {
                                        exclude: ["createdAt", "updatedAt", "password"]
                                    },
                                    include: [
                                        { model: db.Markdown, attributes: ["description", "markDownContent", "htmlContent"] },
                                        { model: db.allcodes, as: "positionData", attributes: ["valueEn", "valueVi"] },
                                        { model: db.allcodes, as: "roleData", attributes: ["valueEn", "valueVi"] },
                                        {
                                            model: db.Doctor_info,
                                            attributes: {
                                                exclude: ["createdAt", "updatedAt"]
                                            },
                                            include: [
                                                { model: db.allcodes, as: "priceData", attributes: ["valueEn", "valueVi"] },
                                                { model: db.allcodes, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                                                { model: db.allcodes, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                                                { model: db.clinic, as: "clinicData", attributes: ["name", "id", "address"] },
                                            ],
                                            raw: true,
                                            nest: true,
                                        },
                                    ],
                                    raw: false,
                                    nest: true,
                                }
                            ],
                            raw: false,
                            nest: true,
                        },
                        {
                            model: db.Markdown,
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            },
                        }
                    ],
                    raw: false,
                    nest: true,
                })
                if (clinic) {
                    resolve({
                        errCode: 201,
                        message: "OK",
                        data: clinic,
                    })
                } else {
                    resolve({
                        errCode: 404,
                        message: "Clinic not found",
                    })
                }
            } else {
                resolve({
                    errCode: 404,
                    message: "Clinic not found",
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handleGetClinicService = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isDigit(clinicId)) {
                let clinic = await db.clinic.findOne({
                    where: { id: +clinicId },
                    include: [
                        {
                            model: db.Markdown, attributes: { exclude: ["id", "createdAt", "updatedAt", "description"] },
                        }
                    ],
                    raw: true,
                    nest: true,
                })
                if (clinic) {
                    resolve({
                        errCode: 200,
                        message: "OK",
                        data: clinic,
                    })
                } else {
                    resolve({
                        errCode: 404,
                        message: "No clinices found",
                        data: [],
                    })
                }
            } else {
                resolve({
                    errCode: 404,
                    message: "No clinices found",
                    data: [],
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handleGetAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.clinic.findAll({
                attributes: { exclude: ["createdAt", "updatedAt", "description"] },
                raw: true,
                nest: true,
            })
            if (clinic) {
                resolve({
                    errCode: 200,
                    message: "OK",
                    data: clinic,
                })
            } else {
                resolve({
                    errCode: 404,
                    message: "No clinices found",
                    data: [],
                })
            }
        }
        catch (error) {
            reject(error);
        }
    })
}
let handleDeleteClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data: ", data);
            let result = await db.clinic.destroy({
                where: {
                    id: data.clinicId,
                    name: data.nameClinic,
                },
            });
            if (result) {
                await db.clinic.destroy({
                    where: {
                        id: data.clinicId,
                    }
                })
                resolve({
                    errCode: 200,
                    message: "OK",
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "Deleting clinic " + data.nameClinic + " failed",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUpSertClinic: handleUpSertClinic,
    handleGetClinicDoctorInfo: handleGetClinicDoctorInfo,
    handleGetClinicService: handleGetClinicService,
    handleGetAllClinicService: handleGetAllClinicService,
    handleUpdateClinic: handleUpdateClinic,
    handleDeleteClinicService: handleDeleteClinicService,
}