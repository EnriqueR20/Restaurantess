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
exports.BuscarRestaurante = exports.ActualiRestaurante = exports.EliminarRestaurante = exports.AllRestaurante = exports.CrearRestaurante = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
/*Creacion de Restaurante */
const CrearRestaurante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, departamento, telefono, referencia, distrito, provincia, tipo, usuarioId, apertura, cierre, fech_creacion, calificacion, descripcion } = req.body;
        const playlist = yield prisma.restaurante.create({
            include: {
                usuario: true,
            },
            data: {
                nombre, departamento, telefono, referencia, distrito, provincia, usuario: { connect: { id: usuarioId } },
                tipo, apertura, cierre, fech_creacion, calificacion, descripcion,
            },
        });
        res.status(201);
        res.json({ message: "RESTAURANTE CREADO CORRECTAMENTE", info: playlist });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
});
exports.CrearRestaurante = CrearRestaurante;
/*Listar Restaurante*/
const AllRestaurante = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allrestau = yield prisma.restaurante.findMany({
            select: {
                nombre: true, departamento: true, telefono: true, referencia: true, distrito: true,
                provincia: true, usuarioId: true,
                tipo: true, apertura: true, cierre: true, fech_creacion: true, calificacion: true, descripcion: true
            },
        });
        res.json(allrestau);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.AllRestaurante = AllRestaurante;
/*Eliminar Restaurante*/
const EliminarRestaurante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        /*en el prisma.plato o comentario */
        const resta = yield prisma.restaurante.delete({
            where: { id }
        });
        /*cambiar mensaje */
        res.json("Restaurante Eliminado");
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.EliminarRestaurante = EliminarRestaurante;
/*Actualizar Restaurante */
const ActualiRestaurante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, departamento, telefono, referencia, distrito, provincia, tipo, usuarioId, apertura, cierre, fech_creacion, calificacion, descripcion } = req.body;
        const id = parseInt(req.params.id);
        const restaurnateUpda = yield prisma.restaurante.update({
            where: { id },
            data: {
                nombre, departamento, telefono, referencia, distrito, provincia, usuario: { connect: { id: usuarioId } },
                tipo, apertura, cierre, fech_creacion, calificacion, descripcion,
            },
        });
        res.json({
            message: "Se Actualizo el Restaurante",
            info: restaurnateUpda,
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.ActualiRestaurante = ActualiRestaurante;
const BuscarRestaurante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const bus_Restaut = yield prisma.restaurante.findUnique({
            where: { id, },
            /*cambiar los campos de mi tabla */
            select: { nombre: true, departamento: true, telefono: true, referencia: true, distrito: true,
                provincia: true, usuarioId: true,
                tipo: true, apertura: true, cierre: true, fech_creacion: true, calificacion: true, descripcion: true },
        });
        res.json(bus_Restaut);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.BuscarRestaurante = BuscarRestaurante;
