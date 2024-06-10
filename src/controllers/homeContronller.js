import db from "../models/index";
import service from "../services/serviceCrud"

let getHome = async (req, res) => {
    res.redirect("get-crud")

}
let getAbout = (req, res) => {
    return res.render("test/about.ejs")
}

let getCrud = (req, res) => {
    return res.render("crud.ejs")
}

let postCrud = async (req, res) => {
    let message = await service.createUser(req.body);
    return res.send(message);
}

let getHandleCrud = async (req, res) => {
    let data = await service.getHandleCrud();
    return res.render("homePage.ejs", {
        dataTable: data,
    })
}
let getUpdateUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let updateUser = await service.getUpdateUser(userId);
        return res.render("updateUser.ejs", {
            user: updateUser,
        })
    }
    else {
        return res.send("not found")
    }
}
let getDeleteUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let message = await service.deleteUser(userId);
        if (message == "ok") {
            return res.redirect("/get-crud")
        }
        return req.send("delete Error")

    } else {
        return req.send("delete Error")
    }
}

let postUpdateUser = async (req, res) => {
    let message = await service.postUpdateUser(req.body)
    if (message == "ok") {
        return res.redirect("/get-crud")
    } else {
        return res.send("Update error")
    }

}
module.exports = {
    getHome: getHome,
    getAbout: getAbout,
    getCrud: getCrud,
    postCrud: postCrud,
    getHandleCrud: getHandleCrud,
    getUpdateUser: getUpdateUser,
    getDeleteUser: getDeleteUser,
    postUpdateUser: postUpdateUser,
}