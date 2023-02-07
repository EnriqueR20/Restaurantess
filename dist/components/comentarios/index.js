"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const controller_1 = require("./controller");
/*creamos la INSTANCIA */
const comentarioRouter = (0, express_1.Router)();
/*Metodos POST */
comentarioRouter.post("/", middleware_1.verifyToken, controller_1.CrearComentario);
/*Metodos GET */
comentarioRouter.get("/:id", controller_1.BuscarComentario);
comentarioRouter.delete("/:id", controller_1.EliminarComentario);
comentarioRouter.put("/:id", controller_1.ActualizaComentario);
comentarioRouter.get("/", controller_1.AllComentario);
exports.default = comentarioRouter;
