import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js'; // Importar la conexión a la base de datos
import {materialModel} from '../models/material.models.js'
import {proyectoModel} from '../models/proyecto.models.js'
import {materialprecioModel} from '../models/materialprecio.model.js'

const ProyectoMaterial = sequelize.define('ProyectoMaterial', {
  id_proyecto: {
    type: DataTypes.INTEGER,
    references: {
      model:proyectoModel.Proyecto,
      key: 'id_proyecto'
    },
    primaryKey: true
  },
  id_material: {
    type: DataTypes.INTEGER,
    references: {
      model: materialModel.Material,
      key: 'id_material'
    },
    primaryKey: true
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: materialprecioModel.MaterialPrecio,
      key: 'id_proveedor'
    },
    primaryKey: true
  },
  fecha_material: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  timestamps: false,
  tableName: 'proyecto_material'
});


export const proyectomaterialModel={
ProyectoMaterial
}

