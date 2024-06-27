import _, { includes, reject } from "lodash"
import db from "../models/index"
import specialty from "../models/specialty";
import { name } from "ejs";

let isDigit = (char) => {
    return !isNaN(char) && !isNaN(parseFloat(char));
}
let handleUpSertSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data: ", data);
            let [specialty, createSpecilty] = await db.specialty.findOrCreate({
                where: { name: data.nameSpecialty },
                defaults: {
                    name: data.nameSpecialty,
                    image: data.image,
                },
                raw: true,
            })
            if (createSpecilty) {
                await db.Markdown.create({
                    htmlContent: data.htmlContent,
                    markDownContent: data.markDownContent,
                    specialtyId: specialty.id,
                })
                resolve({
                    errCode: 200,
                    message: "OK",
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "Specialty already exists",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let handleUpdateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.specialty.findOne({
                where: {
                    id: data.specialtyId,
                },
                raw: true,
            })
            if (specialty) {
                await db.specialty.update({
                    name: data.nameSpecialty,
                    image: data.image,
                }, {
                    where: {
                        id: data.specialtyId,
                    }
                })
                await db.Markdown.update({
                    htmlContent: data.htmlContent,
                    markDownContent: data.markDownContent,
                }, {
                    where: {
                        specialtyId: data.specialtyId,
                    }
                })
                resolve({
                    errCode: 200,
                    message: "OK",
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "Specialty not exists",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let handleGetSpecialtyDoctorInfo = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check specialty: ", specialtyId);
            if (specialtyId == "ALL") {
                let specialty = await db.specialty.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                    include: [
                        {
                            model: db.Doctor_info, as: "specialtyData",
                            attributes: {
                                exclude: ["id", "createdAt", "updatedAt"]
                            },
                            include: [
                                { model: db.allcodes, as: "priceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.allcodes, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.allcodes, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                                {
                                    model: db.User, attributes: {
                                        exclude: ["createdAt", "updatedAt", "password"]
                                    },
                                }
                            ],
                            raw: false,
                            nest: true,
                        },
                        {
                            model: db.Markdown,
                            attributes: {
                                exclude: ["id", "createdAt", "updatedAt"]
                            },
                        }
                    ],
                    raw: false,
                    nest: true,
                })
                if (specialty) {
                    resolve({
                        errCode: 200,
                        message: "OK",
                        data: specialty,
                    })
                } else {
                    resolve({
                        errCode: 201,
                        message: "Specialty not found",
                    })
                }
            }

            else {
                resolve({
                    errCode: 201,
                    message: "find one",
                })
            }


        } catch (error) {
            reject(error);
        }
    })
}
let handleGetSpecialService = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isDigit(specialtyId)) {
                let specialty = await db.specialty.findOne({
                    where: { id: +specialtyId },
                    include: [
                        {
                            model: db.Markdown, attributes: { exclude: ["id", "createdAt", "updatedAt", "description"] },
                        }
                    ],
                    raw: true,
                    nest: true,
                })
                if (specialty) {
                    resolve({
                        errCode: 200,
                        message: "OK",
                        data: specialty,
                    })
                } else {
                    resolve({
                        errCode: 404,
                        message: "No specialties found",
                        data: [],
                    })
                }
            } else {
                resolve({
                    errCode: 404,
                    message: "No specialties found",
                    data: [],
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handleGetAllSpecialService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.specialty.findAll({
                attributes: { exclude: ["image", "createdAt", "updatedAt", "description"] },
                raw: true,
                nest: true,
            })
            if (specialty) {
                resolve({
                    errCode: 200,
                    message: "OK",
                    data: specialty,
                })
            } else {
                resolve({
                    errCode: 404,
                    message: "No specialties found",
                    data: [],
                })
            }
        }
        catch (error) {
            reject(error);
        }
    })
}
let handleDeleteSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data: ", data);
            let result = await db.specialty.destroy({
                where: {
                    id: data.specialtyId,
                    name: data.nameSpecialty,
                },
            });
            if (result) {
                await db.specialty.destroy({
                    where: {
                        id: data.specialtyId,
                    }
                })
                resolve({
                    errCode: 200,
                    message: "OK",
                })
            } else {
                resolve({
                    errCode: 201,
                    message: "Deleting specialty " + data.nameSpecialty + " failed",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUpSertSpecialty: handleUpSertSpecialty,
    handleGetSpecialtyDoctorInfo: handleGetSpecialtyDoctorInfo,
    handleGetSpecialService: handleGetSpecialService,
    handleGetAllSpecialService: handleGetAllSpecialService,
    handleUpdateSpecialty: handleUpdateSpecialty,
    handleDeleteSpecialtyService: handleDeleteSpecialtyService,
}