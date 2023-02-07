"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./components/index");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use("/usuario", index_1.usuarioRouter);
app.use("/restaurante", index_1.restauranteRouter);
app.use("/comentarios", index_1.comentarioRouter);
app.use("/platos", index_1.platoRouter);
exports.default = app;
