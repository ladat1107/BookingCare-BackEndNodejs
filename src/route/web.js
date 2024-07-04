import express from "express";
import homeContronller from "../controllers/homeContronller";
import userController from "../controllers/userController";
import allCodeController from "../controllers/allCodeController";
import doctorController from "../controllers/doctorController";
import bookingController from "../controllers/bookingController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
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

    router.get("/api/get-top-doctor", doctorController.getTopDoctor)
    router.get("/api/get-all-doctor", doctorController.getAllDoctor)
    router.post("/api/create-page-doctor", doctorController.createPageDoctor)
    router.get("/api/get-doctor-mardown", doctorController.getDoctorMardown)

    router.post("/api/create-schedule-doctor", doctorController.createSchedule)
    router.get("/api/get-schedule-doctor", doctorController.getScheduleDoctorByDate)


    router.post("/api/create-appointment-doctor", bookingController.createAppointmentForUser)
    router.put("/api/confirm-schedule-doctor", bookingController.confirmSchedule)

    router.post("/api/create-page-specialty", specialtyController.handleUpSertSpecialty)
    router.get("/api/get-specialty-doctor", specialtyController.handleGetSpecialtyDoctorInfo)
    router.get("/api/get-specialty-admin-manager", specialtyController.handleGetSpecial)
    router.get("/api/get-one-specialty-admin-manager", specialtyController.handleGetSpecialtyById)
    router.put(`/api/update-page-specialty`, specialtyController.handleUpdateSpecialty);
    router.post("/api/delete-page-specialty", specialtyController.handleDeleteSpecialty);

    router.post("/api/create-page-clinic", clinicController.handleUpSertClinic);
    router.get("/api/get-clinic-doctor", clinicController.handleGetClinicDoctorInfo)
    router.get("/api/get-clinic-admin-manager", clinicController.handleGetClinic)
    router.get("/api/get-one-clinic-admin-manager", clinicController.handleGetClinicById)
    router.put(`/api/update-page-clinic`, clinicController.handleUpdateClinic);
    router.post("/api/delete-page-clinic", clinicController.handleDeleteClinic);


    return app.use("/", router);
}
//npx sequelize-cli db:migrate
module.exports = initWebRoutes;