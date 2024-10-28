import {ProveedorModel} from '../models/proveedor.models.js'

// Crear un nuevo proveedor
const createProveedor = async (req, res) => {
  const { nombre_proveedor, contacto, telefono } = req.body;

  try {
    const newProveedor = await ProveedorModel.Proveedor.create({
      nombre_proveedor,
      contacto,
      telefono
    });
    res.status(201).json(newProveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
};

// Obtener todos los proveedores
const getAllProveedores = async (req, res) => {
  try {
    const proveedores = await ProveedorModel.Proveedor.findAll();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
};

// Obtener un proveedor por ID
const getProveedorById = async (req, res) => {
  const { id } = req.params;

  try {
    const proveedor = await ProveedorModel.Proveedor.findByPk(id);
    if (proveedor) {
      res.status(200).json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proveedor' });
  }
};

// Actualizar un proveedor por ID
const updateProveedor = async (req, res) => {
  const { id } = req.params;
  const { nombre_proveedor, contacto, telefono } = req.body;

  try {
    const proveedor = await ProveedorModel.Proveedor.findByPk(id);
    if (proveedor) {
      proveedor.nombre_proveedor = nombre_proveedor;
      proveedor.contacto = contacto;
      proveedor.telefono = telefono;
      await proveedor.save();
      res.status(200).json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
};

// Eliminar un proveedor por ID
const deleteProveedor = async (req, res) => {
  const { id } = req.params;

  try {
    const proveedor = await ProveedorModel.Proveedor.findByPk(id);
    if (proveedor) {
      await proveedor.destroy();
      res.status(204).send();  // No content
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
};

export const proveedorController ={
  createProveedor,getAllProveedores,getProveedorById,updateProveedor,deleteProveedor
}
