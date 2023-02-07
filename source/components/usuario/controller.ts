import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
const prisma = new PrismaClient();






/*Creacion de Usuarios */
export const CrearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {

    /*Lo de abajo son mis campos de la tabla */
    const { nombre,dni,telefono,correo,contrasena,es_propietario } = req.body;


    /*DE aqui */
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    /*BOrrar */


    /* donde dice prisma. comentarios o platos */
    const user = await prisma.usuario.create({
      data: {
    /* Agregar campos que ya estan arriba en el const */    
        nombre,dni,telefono,correo,contrasena: hashedPassword,es_propietario,},
      });

    
    /*Cambiar mensaje  */  
    res.status(201).json({ message: "Usuario Creado Correctamente", info: user });
  } catch (error) {
    res.status(500).json({ message: error });
    /*Capturo Error */
    console.log(res)
  }
};


/*Esto eliminar ----- */
/*Creacion de Logeo */
export const Logeo = async (req: Request, res: Response)=> {
  try {
    const { correo, contrasena } = req.body;
    const user = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!user) {
      return res.status(401).json({ message: "Correo no Regisrado" });
    }
    const passwordIsValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ auth: false, message: "Ups ... Contraseña Incorrecta" });
    }

    const token = jwt.sign(user, process.env.TOKEN_SECRET!, {
      /*Le asignamos el Rango de 1 dia el Token */
      expiresIn: 24*60*60,
    });

    res.json({ auth: true ,token });
  } catch (error) {
    res.status(500).json({ auth: false, message: error });
    console.log(error)
  }
};





/*BuscarUsuario por BuscarPlato */
/*Buscando Uusuario por Id */
export const BuscarUsuario = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    /*prisma.plato */
    const user = await prisma.usuario.findUnique({


      where: {id,},

      /*cambiar los campos de mi tabla */
      select: {id: true,nombre: true,dni: true,telefono:true,
      correo : true},
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}




/*BuscarUsuario por BuscarPlato */
export const EliminarUsuario = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    /*en el prisma.plato o comentario */
    const user = await prisma.usuario.delete({
      where: {id}
    });

    /*cambiar mensaje */
    res.json("Usuario Eliminado");
  } catch (error) {
    res.status(500).json({ message: error });
  }
}




export const ActualiUsuario = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { nombre,dni,telefono,correo,contrasena,es_propietario } = req.body;
    const id: number = parseInt(req.params.id);

    /*esto noooooo */
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    /*estoooooooooooooooo */


    const usuarioUpda = await prisma.usuario.update({
      where: {id},
      data: {
        nombre,dni,telefono,correo,contrasena: hashedPassword,es_propietario,},
      });

    res.json({
      message: "Se Actualizo el Usuario",
      info: usuarioUpda,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



///Todos los Registros
/*Todo el playlist  */

/*cambiar el All Usuario*/
export const AllUsuario = async (_req: Request, res: Response): Promise<void> => {
  try {

    /*cambiar el prisma.plato */
    const allusuario = await prisma.usuario.findMany({

      /*Todos los campos imagen:true,disponibilidad :true */
      select: {
        nombre:true,dni:true,telefono:true,correo:true,contrasena:true,es_propietario:true,
      },
    });
    res.json(allusuario);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};