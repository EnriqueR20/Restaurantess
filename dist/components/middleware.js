"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
// Exportar la función verifyToken
function verifyToken(req, res, next) {
    // Obtenemos el token de autorización de las cabeceras de la solicitud en mi caso en ThunderClient
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ message: "NO ingreso token" });
    jwt.verify(authorization, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                return res.status(401).send({ message: "Token EXPIRADO" });
            }
            else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                return res.status(401).send({ message: "Token INVALIDO" });
            }
        }
        req.user = decoded.data;
        next();
    });
}
exports.verifyToken = verifyToken;
