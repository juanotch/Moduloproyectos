import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js'; // Importar la conexión a la base de datos


const Proyecto = sequelize.define('Proyecto', {
  id_proyecto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  }
 
}, {
  tableName: 'proyecto',
  timestamps: false // Si no tienes campos created_at y updated_at
});


export const proyectoModel={
Proyecto
}



