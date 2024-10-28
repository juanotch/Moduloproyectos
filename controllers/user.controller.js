import jwt from 'jsonwebtoken'
import {UserModel} from '../models/user.model.js'
import bcrypt from 'bcryptjs/dist/bcrypt.js'



const register = async (req,res) => {
    try {

      
      const {nombre,email,password}=req.body

       // Validaciones
    if (!nombre || !email || !password) {
      return res.status(400).json({ ok: false, msg: "All fields are required" });
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/; // Asegúrate de que el nombre de usuario solo contenga letras y números
    if (!usernameRegex.test(nombre)) {
      return res.status(400).json({ ok: false, msg: "Username is invalid" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ ok: false, msg: "Email is invalid" });
    }

    if (password.length < 6) {
      return res.status(400).json({ ok: false, msg: "Password must be at least 6 characters long" });
    }

    const user=await UserModel.Usuario.encontrarPorEmail(email)
    if (user) {
     return res.status(409).json({ok:true,msg:"el email ya existe"})
    }

    const newuser=await UserModel.Usuario.crearUsuario({email,password,nombre})

    const token= jwt.sign({
      email:newuser.email
    },process.env.JWT_SECRET,
    {
      expiresIn:"1h"
    }
  
    )

      return res.status(201).json({ok:true,msg:token})
    } catch (error) { 
      console.log(error)
      return res.status(500).json({ok:false,msg:"error server"})  
    }
    
}


const login = async (req,res) => {
    try {
      const {email,password}=req.body
      
         // Validaciones
    if (!email  || !password) {
      return res.status(400).json({ ok: false, msg: "All fields are required" });
    }


    const user=await UserModel.Usuario.encontrarPorEmail(email)



    if(!user){
      return res.status(404).json({error:"user not Found"})
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
       return res.status(401).json({error:"Invalid User"})
    }

     const token= jwt.sign({
      email:user.email,
      rol:user.rol,
    },process.env.JWT_SECRET,
    {
      expiresIn:"1h"
    }
    )
        return res.status(200).json({ok:true,msg:token})
    } catch (error) {
      console.log(error)
      return res.status(500).json({ok:false,msg:"error server"})    
    }
    
   
}

const profile = async (req,res) => {
  try {

    const user= await UserModel.Usuario.encontrarPorEmail(req.email)
     // Eliminar la contraseña del objeto antes de devolverlo
    const { contraseña, ...userWithoutPassword } = user.dataValues;


    return res.json({ok:true,msg:userWithoutPassword })
  } catch (error) {
    console.log(error)
      return res.status(500).json({ok:false,msg:"error server"})  
  }
}


export const userController ={
    register,login,profile
}