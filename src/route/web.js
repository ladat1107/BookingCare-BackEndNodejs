import express from "express";
import homeContronller from "../controllers/homeContronller";
import userController from "../controllers/userController";
import allCodeController from "../controllers/allCodeController";
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

    router.post("/api/login", userController.handleLogin);
    router.get(`/api/get-user-login`, userController.getUser);
    router.post("/api/create-new-user", userController.handleCreateUser);
    router.get("/api/delete-user", userController.handleDeleteUser);
    router.put("/api/update-user", userController.hanldeUpdateUser);

    router.get("/api/get-all-code", allCodeController.getAllCode);



    return app.use("/", router);
}

module.exports = initWebRoutes;