"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const controller_1 = require("./controller");
/*creamos la INSTANCIA */
const platoRouter = (0, express_1.Router)();
/*Metodos POST */
platoRouter.post("/", middleware_1.verifyToken, controller_1.CrearPlato);
/*Metodos GET */
platoRouter.get("/:id", controller_1.BuscarPlato);
platoRouter.delete("/:id", controller_1.EliminarPlato);
platoRouter.put("/:id", controller_1.ActualizaPlato);
platoRouter.get("/", controller_1.AllPlato);
exports.default = platoRouter;
