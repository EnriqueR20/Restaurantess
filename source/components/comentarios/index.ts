import { Router } from "express";
import { verifyToken } from "../middleware";
import { CrearComentario, BuscarComentario,EliminarComentario,ActualizaComentario , AllComentario} from "./controller";


/*creamos la INSTANCIA */
const comentarioRouter: Router = Router();

/*Metodos POST */
comentarioRouter.post("/",verifyToken, CrearComentario);

/*Metodos GET */
comentarioRouter.get("/:id", BuscarComentario);

comentarioRouter.delete("/:id",EliminarComentario)

comentarioRouter.put("/:id",ActualizaComentario)

comentarioRouter.get("/",AllComentario)

export default comentarioRouter;