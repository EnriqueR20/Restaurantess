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
exports.AllUsuario = exports.ActualiUsuario = exports.EliminarUsuario = exports.BuscarUsuario = exports.Logeo = exports.CrearUsuario = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
/*Creacion de Usuarios */
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*Lo de abajo son mis campos de la tabla */
        const { nombre, dni, telefono, correo, contrasena, es_propietario } = req.body;
        /*DE aqui */
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(contrasena, saltRounds);
        /*BOrrar */
        /* donde dice prisma. comentarios o platos */
        const user = yield prisma.usuario.create({
            data: {
                /* Agregar campos que ya estan arriba en el const */
                nombre, dni, telefono, correo, contrasena: hashedPassword, es_propietario,
            },
        });
        /*Cambiar mensaje  */
        res.status(201).json({ message: "Usuario Creado Correctamente", info: user });
    }
    catch (error) {
        res.status(500).json({ message: error });
        /*Capturo Error */
        console.log(res);
    }
});
exports.CrearUsuario = CrearUsuario;
/*Esto eliminar ----- */
/*Creacion de Logeo */
const Logeo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, contrasena } = req.body;
        const user = yield prisma.usuario.findUnique({
            where: { correo },
        });
        if (!user) {
            return res.status(401).json({ message: "Correo no Regisrado" });
        }
        const passwordIsValid = yield bcrypt_1.default.compare(contrasena, user.contrasena);
        if (!passwordIsValid) {
            return res
                .status(401)
                .json({ auth: false, message: "Ups ... Contraseña Incorrecta" });
        }
        const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET, {
            /*Le asignamos el Rango de 1 dia el Token */
            expiresIn: 24 * 60 * 60,
        });
        res.json({ auth: true, token });
    }
    catch (error) {
        res.status(500).json({ auth: false, message: error });
        console.log(error);
    }
});
exports.Logeo = Logeo;
/*BuscarUsuario por BuscarPlato */
/*Buscando Uusuario por Id */
const BuscarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        /*prisma.plato */
        const user = yield prisma.usuario.findUnique({
            where: { id, },
            /*cambiar los campos de mi tabla */
            select: { id: true, nombre: true, dni: true, telefono: true,
                correo: true },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.BuscarUsuario = BuscarUsuario;
/*BuscarUsuario por BuscarPlato */
const EliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        /*en el prisma.plato o comentario */
        const user = yield prisma.usuario.delete({
            where: { id }
        });
        /*cambiar mensaje */
        res.json("Usuario Eliminado");
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.EliminarUsuario = EliminarUsuario;
const ActualiUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, dni, telefono, correo, contrasena, es_propietario } = req.body;
        const id = parseInt(req.params.id);
        /*esto noooooo */
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(contrasena, saltRounds);
        /*estoooooooooooooooo */
        const usuarioUpda = yield prisma.usuario.update({
            where: { id },
            data: {
                nombre, dni, telefono, correo, contrasena: hashedPassword, es_propietario,
            },
        });
        res.json({
            message: "Se Actualizo el Usuario",
            info: usuarioUpda,
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.ActualiUsuario = ActualiUsuario;
///Todos los Registros
/*Todo el playlist  */
/*cambiar el All Usuario*/
const AllUsuario = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*cambiar el prisma.plato */
        const allusuario = yield prisma.usuario.findMany({
            /*Todos los campos imagen:true,disponibilidad :true */
            select: {
                nombre: true, dni: true, telefono: true, correo: true, contrasena: true, es_propietario: true,
            },
        });
        res.json(allusuario);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.AllUsuario = AllUsuario;
