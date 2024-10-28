import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js'; // Importar la conexión a la base de datos
import {materialModel} from '../models/material.models.js'
import {ProveedorModel} from '../models/proveedor.models.js'

const MaterialPrecio = sequelize.define('MaterialPrecio', {
  id_material: {
    type: DataTypes.INTEGER,
    references: {
      model:materialModel.Material,
      key: 'id_material'
    },
    primaryKey: true
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: ProveedorModel.Proveedor, // Debes definir el modelo Proveedor
      key: 'id_proveedor'
    },
    primaryKey: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true // Puede ser null si sigue vigente
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'material_precio'
});



export const materialprecioModel={
MaterialPrecio
}
