import { RequestHandler } from "express";

export const signup: RequestHandler = async (req, res) => {
  // Lógica de cadastro local (se quiser)
  res.json({ message: "Usuário cadastrado com sucesso!" });
};