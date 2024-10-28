import { Router } from "express";
import { proyectoController } from "../controllers/proyecto.controller.js";


const router =Router()

// Ruta para crear un nuevo proyecto
router.post('/crearproyectos', proyectoController.crearProyecto);

// Ruta para obtener todos los proyectos
router.get('/proyectos', proyectoController.obtenerProyectos);

// Ruta para obtener un proyecto por ID
router.get('/proyectos/:id_proyecto', proyectoController.obtenerProyectoPorId);

// Ruta para actualizar un proyecto
router.put('/proyectos/:id_proyecto', proyectoController.actualizarProyecto);

// Ruta para eliminar un proyecto
router.delete('/proyectos/:id_proyecto', proyectoController.eliminarProyecto);


export default router;