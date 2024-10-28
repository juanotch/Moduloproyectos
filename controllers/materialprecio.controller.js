import {materialprecioModel} from '../models/materialprecio.model.js'

// Obtener precios por material y proveedor
const getPrices = async (req, res) => {
  const { id_material, id_proveedor } = req.params;
  try {
    const prices = await materialprecioModel.MaterialPrecio.findAll({ where: { id_material, id_proveedor } });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener precios' });
  }
};

// Crear un nuevo precio para un material y proveedor
const createMaterialPrice = async (req, res) => {
  const { id_material, id_proveedor, fecha_inicio, fecha_fin, precio } = req.body;
  try {
    const newPrice = await materialprecioModel.MaterialPrecio.create({ id_material, id_proveedor, fecha_inicio, fecha_fin, precio });
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear precio' });
  }
};

// Actualizar un precio existente
const updateMaterialPrice = async (req, res) => {
  const { id_material, id_proveedor, fecha_inicio } = req.params;
  const { fecha_fin, precio } = req.body;
  try {
    const price = await materialprecioModel.MaterialPrecio.findOne({ where: { id_material, id_proveedor, fecha_inicio } });
    if (!price) {
      return res.status(404).json({ error: 'Precio no encontrado' });
    }
    price.fecha_fin = fecha_fin;
    price.precio = precio;
    await price.save();
    res.status(200).json(price);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar precio' });
  }
};

// Eliminar un precio de material
const deleteMaterialPrice = async (req, res) => {
  const { id_material, id_proveedor, fecha_inicio } = req.params;
  try {
    const price = await materialprecioModel.MaterialPrecio.findOne({ where: { id_material, id_proveedor, fecha_inicio } });
    if (!price) {
      return res.status(404).json({ error: 'Precio no encontrado' });
    }
    await price.destroy();
    res.status(200).json({ message: 'Precio eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar precio' });
  }
};

export const materialprecioController ={
  getPrices,createMaterialPrice,updateMaterialPrice,deleteMaterialPrice
}
