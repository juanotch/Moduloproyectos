import { Router } from "express";
import { proveedorController } from "../controllers/proveedor.controller.js";


const router =Router()

// Rutas CRUD para proveedores
router.post('/proveedores', proveedorController.createProveedor);          // Crear proveedor
router.get('/proveedores', proveedorController.getAllProveedores);         // Obtener todos los proveedores
router.get('/proveedores/:id', proveedorController.getProveedorById);      // Obtener proveedor por ID
router.put('/proveedores/:id', proveedorController.updateProveedor);       // Actualizar proveedor por ID
router.delete('/proveedores/:id', proveedorController.deleteProveedor);    // Eliminar proveedor por ID


export default router;