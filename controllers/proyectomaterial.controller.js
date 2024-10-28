import {proyectomaterialModel} from '../models/proyectomaterial.models.js'
import {proyectoModel} from '../models/proyecto.models.js'
import {materialModel} from '../models/material.models.js'


// Obtener materiales utilizados en un proyecto
const getMaterialsByProject = async (req, res) => {
 const { id_proyecto } = req.params;
  try {
    const materials = await proyectomaterialModel.ProyectoMaterial.findAll({ where: { id_proyecto } });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materiales del proyecto', details: error  });
  }
};


// Asociar un material a un proyecto
const addMaterialToProject = async (req, res) => {
  const { id_proyecto, id_material, id_proveedor, cantidad, fecha_material } = req.body;
  try {
    const projectMaterial = await proyectomaterialModel.ProyectoMaterial.create({
      id_proyecto,
      id_material,
      id_proveedor,
      cantidad,
      fecha_material
    });
    res.status(201).json(projectMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar material al proyecto' , details: error });
  }
};

// Actualizar cantidad de material en proyecto
const updateMaterialInProject = async (req, res) => {
  const { id_proyecto, id_material, id_proveedor, fecha_material } = req.params;
  const { cantidad } = req.body;
  try {
    const projectMaterial = await proyectomaterialModel.ProyectoMaterial.findOne({
      where: { id_proyecto, id_material, id_proveedor, fecha_material }
    });
    if (!projectMaterial) {
      return res.status(404).json({ error: 'Material en proyecto no encontrado' });
    }
    projectMaterial.cantidad = cantidad;
    await projectMaterial.save();
    res.status(200).json(projectMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar material en proyecto' });
  }
};

// Eliminar material de un proyecto
const removeMaterialFromProject = async (req, res) => {
  const { id_proyecto, id_material, id_proveedor, fecha_material } = req.params;
  try {
    const projectMaterial = await proyectomaterialModel.ProyectoMaterial.findOne({
      where: { id_proyecto, id_material, id_proveedor, fecha_material }
    });
    if (!projectMaterial) {
      return res.status(404).json({ error: 'Material en proyecto no encontrado' });
    }
    await projectMaterial.destroy();
    res.status(200).json({ message: 'Material eliminado del proyecto con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar material del proyecto' });
  }
};

export const proyectomaterialController ={
  getMaterialsByProject,addMaterialToProject,updateMaterialInProject,removeMaterialFromProject
}
