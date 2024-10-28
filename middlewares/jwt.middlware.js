import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ ok: false, msg: "token no provided" });
  }

  token = token.split(" ")[1];

  try {
    const {email,rol}=jwt.verify(token, process.env.JWT_SECRET);
     req.email=email
     req.rol=rol
    next();
  } catch (error) {
    return res.status(400).json({ ok: false, msg: "token no valid" });

  }

};

export const verifyRole = (rolesPermitidos) => {
  return (req, res, next) => {
    try {

      // Verificar si el rol del usuario está entre los roles permitidos
      if (!rolesPermitidos.includes(req.rol)) {
        return res.status(403).json({ ok: false, msg: "Acceso denegado: rol insuficiente" });
      }

      next();
    } catch (error) {
      console.log("Error al verificar el rol:", error);
      return res.status(401).json({ ok: false, msg: "Token inválido o expirado" });
    }
  };
};

