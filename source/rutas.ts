import express, { type Application } from "express";
import { usuarioRouter, comentarioRouter, platoRouter, restauranteRouter} from "./components/index";


import cors from "cors";


const app: Application = express();

//middlewares
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/usuario", usuarioRouter);
app.use("/restaurante", restauranteRouter);
app.use("/comentarios", comentarioRouter);
app.use("/platos", platoRouter);

export default app;