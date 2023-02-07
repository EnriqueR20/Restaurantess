/*Importamos las librerias y corremos el servidor*/

import app from "./rutas";
import dotenv from "dotenv";

dotenv.config();


const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`Servidor en el puerto http://localhost:${PORT}`);
});