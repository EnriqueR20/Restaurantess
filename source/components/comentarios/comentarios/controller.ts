import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
const prisma = new PrismaClient();


export const CrearComentario = async (req: Request, res: Response): Promise<void> => {
  try {

    const { comentario,calificacion, restaurante_Id } = req.body;

    const comentarios = await prisma.comentario.create({
      include:{
        restaurante:true,
      },
        data: {   
        comentario, calificacion,restaurante: { connect: { id: restaurante_Id } }},
      });

    res.status(201).json({ message: "Comentario realizado", info: comentarios });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(res)
  }
};


export const BuscarComentario = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    const comentarios = await prisma.comentario.findUnique({
      where: {id,},

      select: {comentario: true,calificacion: true},
    });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


export const EliminarComentario = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    const comentarios = await prisma.comentario.delete({
      where: {id}
    });

    res.json("Comentario Eliminado");
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


export const ActualizaComentario = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { comentario, calificacion } = req.body;
    const id: number = parseInt(req.params.id);

    const comentarioUpda = await prisma.comentario.update({
      where: {id},
      data: {
        comentario, calificacion,},
      });

    res.json({
      message: "Se Actualizo el Comentario",
      info: comentarioUpda,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export const AllComentario = async (_req: Request, res: Response): Promise<void> => {
  try {

    const AllComentario = await prisma.comentario.findMany({
      select: {
        comentario:true,calificacion:true,
      },
    });
    res.json(AllComentario);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};