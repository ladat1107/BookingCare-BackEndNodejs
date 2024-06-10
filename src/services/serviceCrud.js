import bcrypt from 'bcryptjs';
import db from "../models/index"
import { raw } from 'body-parser';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashPasswordUser(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId
            })
            resolve("Them thanh cong rùi ><")
        } catch (e) {
            reject(e);
        }
    })
}

let hashPasswordUser = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
};

let getHandleCrud = async () => {
    return new Promise(async (reslove, reject) => {
        try {
            let getUser = await db.User.findAll({
                raw: true
            });
            reslove(getUser);
        } catch (e) {
            reject(e);
        }
    })
}
let getUpdateUser = async (userId) => {
    return new Promise(async (reslove, reject) => {
        try {
            let User = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (User === null) {
                reslove([]);
            } else {
                reslove(User);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let postUpdateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: true,
            });
            if (user) {
                // console.log('User found:', user);
                user.lastName = data.lastName;
                user.firstName = data.firstName;
                user.address = data.address;

                console.log('User update:', user);
                await db.User.update(user, {
                    where: { id: user.id }
                })
                resolve("ok")
            } else {
                resolve("error")
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = async (userId) => {
    return new Promise(async (reslove, reject) => {
        try {
            await db.User.destroy({
                where: {
                    id: userId,
                },
            });
            reslove("ok")
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createUser: createUser,
    hashPasswordUser: hashPasswordUser,
    getHandleCrud: getHandleCrud,
    getUpdateUser: getUpdateUser,
    postUpdateUser: postUpdateUser,
    deleteUser: deleteUser,
}