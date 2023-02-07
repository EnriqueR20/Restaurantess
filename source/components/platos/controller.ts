import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
const prisma = new PrismaClient();


export const CrearPlato= async (req: Request, res: Response): Promise<void> => {
  try {

    const {  nombre_plato, precio, imagen, disponibilidad,descripcion, restaurante_Id } = req.body;

    const plato = await prisma.plato.create({
      include:{
        restaurante:true,
      },
      data: {  
        nombre_plato, precio, imagen, disponibilidad,descripcion,restaurante: { connect: { id: restaurante_Id } }},
      });

    res.status(201).json({ message: "Plato Creado Correctamente", info: plato });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(res)
  }
};

export const BuscarPlato = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    const plato = await prisma.plato.findUnique({
      where: {id,},

      select: {nombre_plato:true, precio:true, imagen:true, disponibilidad:true,descripcion:true,},
    });
    res.json(plato);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const EliminarPlato = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    const plato = await prisma.plato.delete({
      where: {id}
    });

    res.json("Plato Eliminado");
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const ActualizaPlato = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { nombre_plato, precio, imagen, disponibilidad,descripcion } = req.body;
    const id: number = parseInt(req.params.id);

    const platoUpda = await prisma.plato.update({
      where: {id},
      data: {
        nombre_plato, precio, imagen, disponibilidad,descripcion},
      });

    res.json({
      message: "Se Actualizo el Usuario",
      info: platoUpda,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export const AllPlato = async (_req: Request, res: Response): Promise<void> => {
  try {

    const AllPlato = await prisma.plato.findMany({

      select: {
        nombre_plato:true, precio:true, imagen:true, disponibilidad:true,descripcion:true,
      },
    });
    res.json(AllPlato);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};