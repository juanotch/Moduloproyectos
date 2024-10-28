import { Sequelize } from "sequelize";


const sequelize= new Sequelize('proyectos','root','root1234',{
    host:'localhost',
    dialect:'mysql'
});

// Verificar la conexión
try {
  await sequelize.authenticate();
  console.log('Conexión exitosa a MySQL con Sequelize');
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

export default sequelize;

