"use strict";
/*Importamos las librerias y corremos el servidor*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rutas_1 = __importDefault(require("./rutas"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
rutas_1.default.listen(PORT, () => {
    console.log(`Servidor en el puerto http://localhost:${PORT}`);
});
