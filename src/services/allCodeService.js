import { where } from "sequelize";
import db from "../models/index"

let getAllCodeService = async (typeServer) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            data = await db.allcodes.findAll({
                where: { type: typeServer }
            })
            if (data) {
                resolve({
                    errCode: 0,
                    message: "OK",
                    allCode: data,
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "Not fault data",
                    allCode: {},
                })
            }
        } catch (e) {
            console.log(e);
        }
    })

}

module.exports = {
    getAllCodeService: getAllCodeService,
}