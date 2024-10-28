import {materialModel} from '../models/material.models.js'

// Obtener todos los materiales
const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialModel.Material.findAll();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materiales' });
  }
};

// Crear un nuevo material
const createMaterial = async (req, res) => {
  const { nombre_material, descripcion, stock } = req.body;
  try {
    const newMaterial = await materialModel.Material.create({ nombre_material, descripcion, stock });
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear material', details: error  });
  }
};

// Actualizar un material
const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { nombre_material, descripcion, stock } = req.body;
  try {
    const material = await materialModel.Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    material.nombre_material = nombre_material;
    material.descripcion = descripcion;
    material.stock = stock;
    await material.save();
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar material' });
  }
};

// Eliminar un material
const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const material = await materialModel.Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    await material.destroy();
    res.status(200).json({ message: 'Material eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar material' });
  }
};



export const materialController ={
  getAllMaterials,createMaterial,updateMaterial,deleteMaterial
}