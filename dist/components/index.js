"use strict";
/* Acceso para las capertas*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platoRouter = exports.comentarioRouter = exports.restauranteRouter = exports.usuarioRouter = void 0;
var usuario_1 = require("./usuario");
Object.defineProperty(exports, "usuarioRouter", { enumerable: true, get: function () { return __importDefault(usuario_1).default; } });
var restaurante_1 = require("./restaurante");
Object.defineProperty(exports, "restauranteRouter", { enumerable: true, get: function () { return __importDefault(restaurante_1).default; } });
var comentarios_1 = require("./comentarios");
Object.defineProperty(exports, "comentarioRouter", { enumerable: true, get: function () { return __importDefault(comentarios_1).default; } });
var platos_1 = require("./platos");
Object.defineProperty(exports, "platoRouter", { enumerable: true, get: function () { return __importDefault(platos_1).default; } });
/* una ves terminado el CRUD poner igual a lo de arriba */
