import { Router } from "express";
import { verifyToken } from "../middleware";
import { CrearUsuario, Logeo ,BuscarUsuario,EliminarUsuario, ActualiUsuario, AllUsuario} from "./controller";


/*creamos la INSTANCIA */
const usuarioRouter: Router = Router();



/*Metodos POST */
usuarioRouter.post("/", CrearUsuario);
usuarioRouter.post("/login", Logeo);


/*Metodos GET */
usuarioRouter.get("/:id", verifyToken, BuscarUsuario);

usuarioRouter.delete("/:id",EliminarUsuario)


usuarioRouter.put("/:id",ActualiUsuario)



usuarioRouter.get("/",AllUsuario)

export default usuarioRouter;