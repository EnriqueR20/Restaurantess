"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllComentario = exports.ActualizaComentario = exports.EliminarComentario = exports.BuscarComentario = exports.CrearComentario = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const CrearComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comentario, calificacion, restaurante_Id } = req.body;
        const comentarios = yield prisma.comentario.create({
            include: {
                restaurante: true,
            },
            data: {
                comentario, calificacion, restaurante: { connect: { id: restaurante_Id } }
            },
        });
        res.status(201).json({ message: "Comentario realizado", info: comentarios });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.log(res);
    }
});
exports.CrearComentario = CrearComentario;
const BuscarComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const comentarios = yield prisma.comentario.findUnique({
            where: { id, },
            select: { comentario: true, calificacion: true },
        });
        res.json(comentarios);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.BuscarComentario = BuscarComentario;
const EliminarComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const comentarios = yield prisma.comentario.delete({
            where: { id }
        });
        res.json("Comentario Eliminado");
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.EliminarComentario = EliminarComentario;
const ActualizaComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comentario, calificacion } = req.body;
        const id = parseInt(req.params.id);
        const comentarioUpda = yield prisma.comentario.update({
            where: { id },
            data: {
                comentario, calificacion,
            },
        });
        res.json({
            message: "Se Actualizo el Comentario",
            info: comentarioUpda,
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.ActualizaComentario = ActualizaComentario;
const AllComentario = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllComentario = yield prisma.comentario.findMany({
            select: {
                comentario: true, calificacion: true,
            },
        });
        res.json(AllComentario);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.AllComentario = AllComentario;
