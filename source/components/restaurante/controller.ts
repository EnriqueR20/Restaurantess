import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Console } from "console";


dotenv.config();
const prisma = new PrismaClient();


/*Creacion de Restaurante */
export const CrearRestaurante = async (req: Request, res: Response): Promise<void> => {
    try {
      const {nombre,departamento,telefono,referencia,distrito,provincia,tipo,usuarioId,
        apertura,cierre,fech_creacion,calificacion,descripcion} = req.body;
      const playlist = await prisma.restaurante.create({
        include: {
          usuario: true,
        },
        data: {
            nombre,departamento,telefono,referencia,distrito,provincia,usuario: { connect: { id: usuarioId } },
            tipo,apertura,cierre,fech_creacion,calificacion,descripcion,
              },
      });
      
      res.status(201)
      res.json({ message: "RESTAURANTE CREADO CORRECTAMENTE", info: playlist });
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error)
    }
  };


  
/*Listar Restaurante*/
export const AllRestaurante = async (_req: Request, res: Response): Promise<void> => {
  try {

    const allrestau = await prisma.restaurante.findMany({
      select: {
        nombre:true,departamento:true,telefono:true,referencia:true,distrito:true
        ,provincia:true,usuarioId:true,
        tipo:true,apertura:true,cierre:true,fech_creacion:true,calificacion:true,descripcion:true
      },
    });
    res.json(allrestau);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



/*Eliminar Restaurante*/
export const EliminarRestaurante = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    /*en el prisma.plato o comentario */
    const resta = await prisma.restaurante.delete({
      where: {id}
    });

    /*cambiar mensaje */
    res.json("Restaurante Eliminado");
  } catch (error) {
    res.status(500).json({ message: error });
  }
}



/*Actualizar Restaurante */

export const ActualiRestaurante = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const {nombre,departamento,telefono,referencia,distrito,provincia,tipo,usuarioId,
      apertura,cierre,fech_creacion,calificacion,descripcion} = req.body;

    const id: number = parseInt(req.params.id);

    const restaurnateUpda = await prisma.restaurante.update({
      where: {id},
      data: {
        nombre,departamento,telefono,referencia,distrito,provincia,usuario: { connect: { id: usuarioId } },
        tipo,apertura,cierre,fech_creacion,calificacion,descripcion,
      
       },
    });
    res.json({
      message: "Se Actualizo el Restaurante",
      info: restaurnateUpda,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export const BuscarRestaurante = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    
    const bus_Restaut = await prisma.restaurante.findUnique({
      where: {id,},

      /*cambiar los campos de mi tabla */
      select: {nombre:true,departamento:true,telefono:true,referencia:true,distrito:true
        ,provincia:true,usuarioId:true,
        tipo:true,apertura:true,cierre:true,fech_creacion:true,calificacion:true,descripcion:true},
    });
    res.json(bus_Restaut);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}