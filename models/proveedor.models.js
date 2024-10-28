import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js'; // Importar la conexión a la base de datos

const Proveedor = sequelize.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_proveedor: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contacto: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'proveedor',  // Nombre de la tabla en la base de datos
  timestamps: false  // Si no quieres que Sequelize maneje createdAt/updatedAt automáticamente
});

export const ProveedorModel={
Proveedor
}

