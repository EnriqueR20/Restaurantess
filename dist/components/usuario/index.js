"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const controller_1 = require("./controller");
/*creamos la INSTANCIA */
const usuarioRouter = (0, express_1.Router)();
/*Metodos POST */
usuarioRouter.post("/", controller_1.CrearUsuario);
usuarioRouter.post("/login", controller_1.Logeo);
/*Metodos GET */
usuarioRouter.get("/:id", middleware_1.verifyToken, controller_1.BuscarUsuario);
usuarioRouter.delete("/:id", controller_1.EliminarUsuario);
usuarioRouter.put("/:id", controller_1.ActualiUsuario);
usuarioRouter.get("/", controller_1.AllUsuario);
exports.default = usuarioRouter;
