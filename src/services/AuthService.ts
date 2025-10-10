import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo_dev";

class AuthService {
  // Simulação: usuário fixo
  static async login(email: string, senha: string) {
    if (email === "admin@admin.com" && senha === "123456") {
      const payload = { email, role: "admin" };
      return jwt.sign(payload, SECRET, { expiresIn: "1h" });
    }
    throw new Error("Credenciais inválidas");
  }
}

export default AuthService;
