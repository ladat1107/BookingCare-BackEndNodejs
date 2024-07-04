import bcrypt from 'bcryptjs';
import db from "../models/index"
import { where } from 'sequelize';
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);

let hashPasswordUser = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleLoginService = async (emailUser, passwordUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (checkEmailExist(emailUser)) {
                let user = await db.User.findOne({
                    attributes: ["email", "roleId", "password", "firstName", "lastName"],
                    where: { email: emailUser },
                    raw: true,
                });
                if (user) {

                    let check = await bcrypt.compareSync(passwordUser, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = "OK";

                        delete user.password;
                        userData.user = user;
                        console.log(user);
                    } else {
                        userData.errCode = 3;
                        userData.message = "Password is incorrect";
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = "User not found";
                }
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmailExist = async (emailUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: emailUser }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })

}

let getUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = {};
            if (userId === "ALL") {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ["password"]
                    }
                });
                userData.errCode = 0;
                userData.message = "OK";
                userData.user = user;
            }
            else {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"]
                    }
                })
                if (!user) {
                    userData.errCode = 2;
                    userData.message = "User not find"
                } else {
                    userData.errCode = 0;
                    userData.message = "OK";
                    userData.user = user;
                }
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let createUser = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            console.log(data);
            let checkEmail = await db.User.findOne({
                where: { email: data.email }
            })
            if (checkEmail) {
                reslove({
                    errCode: 1,
                    message: "Email is existed"
                })
            } else {
                let hashPassword = await hashPasswordUser(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    lastName: data.lastName,
                    firstName: data.firstName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.image,
                })
                reslove({
                    errCode: 0,
                    message: "Create new user successfull"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deteleUser = async (userId) => {
    return new Promise(async (reslove, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await db.User.destroy({
                    where: { id: user.id }
                });
                reslove({
                    errCode: 0,
                    message: "DeleteSucessfull"
                })
            } else {
                reslove({
                    errCode: 2,
                    message: "User not find"
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let putUpdateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.email = data.email;
                user.lastName = data.lastName;
                user.firstName = data.firstName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.image = data.image;
                await db.User.update(user, {
                    where: { id: user.id }
                })
                resolve({
                    errCode: 0,
                    message: "Update successfull"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "User not find"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLoginService: handleLoginService,
    getUser: getUser,
    createUser: createUser,
    deteleUser: deteleUser,
    putUpdateUser: putUpdateUser,
}