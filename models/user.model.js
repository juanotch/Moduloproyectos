import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js'; // Importar la conexión a la base de datos
import bcryptjs from 'bcryptjs';

// Definir el modelo Usuario
const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario'
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'usuarios', // Nombre de la tabla en la base de datos
  timestamps: false       // No usa columnas createdAt y updatedAt
});

Usuario.crearUsuario = async function ({email, password,nombre, rol = 'usuario' }) {
  try {
// Validar entrada

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // Crear el usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,  // Asegúrate de usar la clave correcta
      rol
    });
    
    return usuario;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};


Usuario.encontrarPorEmail = async function (email) {

    // Buscar el usuario en la base de datos por email
    const usuario = await Usuario.findOne({ where: { email } });
    
    // Verificar si el usuario fue encontrado
  
    
    return usuario;

};

export const UserModel={
Usuario
}
