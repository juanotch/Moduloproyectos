import { Router } from "express";
import {materialController} from '../controllers/material.controller.js'
import {materialprecioController} from '../controllers/materialprecio.controller.js'
import {proyectomaterialController} from '../controllers/proyectomaterial.controller.js'

const router =Router()

// Rutas para materiales
router.get('/materials', materialController.getAllMaterials);
router.post('/materials', materialController.createMaterial);
router.put('/materials/:id', materialController.updateMaterial);
router.delete('/materials/:id', materialController.deleteMaterial);

// Rutas para precios de materiales
router.get('/material-precios/:id_material/:id_proveedor', materialprecioController.getPrices);
router.post('/material-precios', materialprecioController.createMaterialPrice);
router.put('/material-precios/:id_material/:id_proveedor/:fecha_inicio', materialprecioController.updateMaterialPrice);
router.delete('/material-precios/:id_material/:id_proveedor/:fecha_inicio', materialprecioController.deleteMaterialPrice);

// Rutas para proyecto-material
router.get('/proyecto-material/:id_proyecto', proyectomaterialController.getMaterialsByProject);
router.post('/proyecto-material', proyectomaterialController.addMaterialToProject);
router.put('/proyecto-material/:id_proyecto/:id_material/:id_proveedor/:fecha_material', proyectomaterialController.updateMaterialInProject);
router.put('/proyecto-material/:id_proyecto/:id_material/:id_proveedor/:fecha_material', proyectomaterialController.removeMaterialFromProject);


export default router;
