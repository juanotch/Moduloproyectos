import {proyectoModel} from '../models/proyecto.models.js'

// Crear un nuevo proyecto
const crearProyecto = async (req, res) => {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, id_empleado_responsable, id_empleado_ejecutor, porcentaje_iva, porcentaje_imprevistos, porcentaje_utilidades, codigoexterno } = req.body;

    // Crear el proyecto
    const nuevoProyecto = await proyectoModel.Proyecto.create({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      id_empleado_responsable,
      id_empleado_ejecutor,
      porcentaje_iva,
      porcentaje_imprevistos,
      porcentaje_utilidades,
      codigoexterno
    });

    return res.status(201).json(nuevoProyecto);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el proyecto', details: error });
  }
};

// Obtener todos los proyectos
const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await proyectoModel.Proyecto.findAll();
    return res.status(200).json(proyectos);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los proyectos', details: error });
  }
};

// Obtener un proyecto por ID
const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await proyectoModel.Proyecto.findByPk(req.params.id_proyecto);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    return res.status(200).json(proyecto);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el proyecto', details: error });
  }
};

// Actualizar un proyecto
const actualizarProyecto = async (req, res) => {
  try {
    const { id_proyecto } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, id_empleado_responsable, id_empleado_ejecutor, porcentaje_iva, porcentaje_imprevistos, porcentaje_utilidades, codigoexterno } = req.body;

    // Buscar y actualizar el proyecto
    const proyecto = await proyectoModel.Proyecto.findByPk(id_proyecto);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    proyecto.nombre = nombre;
    proyecto.descripcion = descripcion;
    proyecto.fecha_inicio = fecha_inicio;
    proyecto.fecha_fin = fecha_fin;
    proyecto.id_empleado_responsable = id_empleado_responsable;
    proyecto.id_empleado_ejecutor = id_empleado_ejecutor;
    proyecto.porcentaje_iva = porcentaje_iva;
    proyecto.porcentaje_imprevistos = porcentaje_imprevistos;
    proyecto.porcentaje_utilidades = porcentaje_utilidades;
    proyecto.codigoexterno = codigoexterno;

    await proyecto.save();

    return res.status(200).json(proyecto);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el proyecto', details: error });
  }
};

// Eliminar un proyecto
const eliminarProyecto = async (req, res) => {
  try {
    const { id_proyecto } = req.params;
    
    const proyecto = await proyectoModel.Proyecto.findByPk(id_proyecto);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await proyecto.destroy();
    return res.status(200).json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el proyecto', details: error });
  }
};

export const proyectoController ={
  crearProyecto,obtenerProyectos, obtenerProyectoPorId,actualizarProyecto,eliminarProyecto
}
