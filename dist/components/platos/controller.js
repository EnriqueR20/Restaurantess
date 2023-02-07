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
exports.AllPlato = exports.ActualizaPlato = exports.EliminarPlato = exports.BuscarPlato = exports.CrearPlato = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const CrearPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_plato, precio, imagen, disponibilidad, descripcion, restaurante_Id } = req.body;
        const plato = yield prisma.plato.create({
            include: {
                restaurante: true,
            },
            data: {
                nombre_plato, precio, imagen, disponibilidad, descripcion, restaurante: { connect: { id: restaurante_Id } }
            },
        });
        res.status(201).json({ message: "Plato Creado Correctamente", info: plato });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.log(res);
    }
});
exports.CrearPlato = CrearPlato;
const BuscarPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const plato = yield prisma.plato.findUnique({
            where: { id, },
            select: { nombre_plato: true, precio: true, imagen: true, disponibilidad: true, descripcion: true, },
        });
        res.json(plato);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.BuscarPlato = BuscarPlato;
const EliminarPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const plato = yield prisma.plato.delete({
            where: { id }
        });
        res.json("Plato Eliminado");
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.EliminarPlato = EliminarPlato;
const ActualizaPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_plato, precio, imagen, disponibilidad, descripcion } = req.body;
        const id = parseInt(req.params.id);
        const platoUpda = yield prisma.plato.update({
            where: { id },
            data: {
                nombre_plato, precio, imagen, disponibilidad, descripcion
            },
        });
        res.json({
            message: "Se Actualizo el Usuario",
            info: platoUpda,
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.ActualizaPlato = ActualizaPlato;
const AllPlato = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllPlato = yield prisma.plato.findMany({
            select: {
                nombre_plato: true, precio: true, imagen: true, disponibilidad: true, descripcion: true,
            },
        });
        res.json(AllPlato);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.AllPlato = AllPlato;
