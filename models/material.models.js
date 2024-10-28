import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js'; // Importar la conexión a la base de datos

const Material = sequelize.define('Material', {
  id_material: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_material: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
   tableName: 'material',  // Define el nombre exacto de la tabla
  freezeTableName: true,  // Evita que Sequelize pluralice el nombre de la tabla
  timestamps: false
});

export const materialModel={
Material
}
