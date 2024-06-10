import express from "express";
import homeContronller from "../controllers/homeContronller";
import loginController from "../controllers/loginController";
require("dotenv").config();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeContronller.getHome);
    router.get('/about', homeContronller.getAbout);
    router.get('/crud', homeContronller.getCrud);

    router.post('/post-crud', homeContronller.postCrud);
    router.get("/get-crud", homeContronller.getHandleCrud);
    router.get("/edit-crud", homeContronller.getUpdateUser);
    router.get("/delete-crud", homeContronller.getDeleteUser);
    router.post("/put-crud", homeContronller.postUpdateUser);

    router.post("/api/login", loginController.handleLogin);
    router.get(`/api/get-user-login`, loginController.getUser);
    router.post("/api/create-new-user", loginController.handleCreateUser);
    router.get("/api/delete-user", loginController.handleDeleteUser);
    router.put("/api/update-user", loginController.hanldeUpdateUser);



    return app.use("/", router);
}

module.exports = initWebRoutes;