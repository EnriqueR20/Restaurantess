"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const middleware_1 = require("../middleware");
/*creamos la INSTANCIA */
const restauranteRouter = (0, express_1.Router)();
/*Metodos POST */
restauranteRouter.post("/", middleware_1.verifyToken, controller_1.CrearRestaurante);
/*Metodos GET */
restauranteRouter.get("/:id", middleware_1.verifyToken, controller_1.BuscarRestaurante);
restauranteRouter.delete("/:id", controller_1.EliminarRestaurante);
restauranteRouter.put("/:id", controller_1.ActualiRestaurante);
restauranteRouter.get("/", controller_1.AllRestaurante);
exports.default = restauranteRouter;
