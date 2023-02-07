import { Router } from "express";
import { ActualiRestaurante, AllRestaurante, BuscarRestaurante, CrearRestaurante, EliminarRestaurante } from "./controller";

import { verifyToken } from "../middleware";

/*creamos la INSTANCIA */
const restauranteRouter: Router = Router();



/*Metodos POST */
restauranteRouter.post("/",verifyToken, CrearRestaurante);

/*Metodos GET */
restauranteRouter.get("/:id", verifyToken, BuscarRestaurante);

restauranteRouter.delete("/:id",EliminarRestaurante)


restauranteRouter.put("/:id",ActualiRestaurante)



restauranteRouter.get("/",AllRestaurante)




export default restauranteRouter;