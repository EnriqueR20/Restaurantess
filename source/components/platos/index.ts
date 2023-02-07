import { Router } from "express";
import { verifyToken } from "../middleware";
import { CrearPlato, BuscarPlato,EliminarPlato, ActualizaPlato, AllPlato} from "./controller";


/*creamos la INSTANCIA */
const platoRouter: Router = Router();



/*Metodos POST */
platoRouter.post("/",verifyToken, CrearPlato);


/*Metodos GET */
platoRouter.get("/:id", BuscarPlato);

platoRouter.delete("/:id",EliminarPlato)


platoRouter.put("/:id",ActualizaPlato)

platoRouter.get("/",AllPlato)

export default platoRouter;