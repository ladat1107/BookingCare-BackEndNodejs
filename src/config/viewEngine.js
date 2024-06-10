import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); //Thu muc picture public
    app.set("view engine", "ejs");          //Tuong tu .jsp 
    app.set("views", "./src/views")         //thu muc cac view
}

module.exports = configViewEngine;          //Khai bao de view su dung