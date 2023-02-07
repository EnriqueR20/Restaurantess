import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;




// Exportar la función verifyToken
export function verifyToken(req: any, res: any, next: any) {

  // Obtenemos el token de autorización de las cabeceras de la solicitud en mi caso en ThunderClient
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ message: "NO ingreso token" });

  jwt.verify(authorization, TOKEN_SECRET!, (err: any, decoded: any) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Token EXPIRADO" });
      } else if (err instanceof JsonWebTokenError) {
        return res.status(401).send({ message: "Token INVALIDO" });
      }
    }
    req.user = decoded.data;
    next();
  });
}