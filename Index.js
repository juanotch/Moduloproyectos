import express from "express";
import userRouter from './routes/user.route.js'
import 'dotenv/config'
import proyectoRouter from './routes/proyecto.route.js'
import materialRouter from './routes/material.route.js'
import proveedorRouter from './routes/proveedor.route.js'

import {proyectoModel} from './models/proyecto.models.js'
import {materialModel} from './models/material.models.js'
import {ProveedorModel} from './models/proveedor.models.js'
import {proyectomaterialModel} from './models/proyectomaterial.models.js'
import {materialprecioModel} from './models/materialprecio.model.js'




const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/users',userRouter)

app.use('/api/v1/materiales', materialRouter);

app.use('/api/v1/proyectos', proyectoRouter);



app.use('/api/v1/proveedor', proveedorRouter);





ProveedorModel.Proveedor.hasMany(materialprecioModel.MaterialPrecio, { foreignKey: 'id_proveedor' });
materialModel.Material.hasMany(materialprecioModel.MaterialPrecio, { foreignKey: 'id_material' });


materialprecioModel.MaterialPrecio.belongsTo(ProveedorModel.Proveedor, { foreignKey: 'id_proveedor' });

proyectoModel.Proyecto.hasMany(proyectomaterialModel.ProyectoMaterial, { foreignKey: 'id_proyecto' });

ProveedorModel.Proveedor.hasMany(proyectomaterialModel.ProyectoMaterial, { foreignKey: 'id_proveedor' });


const PORT=process.env.PORT||3000;

app.listen(PORT,()=>console.log('servidor andadno en puerto'+PORT))