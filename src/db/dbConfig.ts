import * as mysql from 'mysql2/promise';

export const query = async (sql: string, params: any[] = []) => {
  // Crear la conexión a la base de datos
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  try {
    // Ejecutar la consulta
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error; // Lanza el error para manejarlo más arriba en la cadena
  } finally {
    // Asegurarse de cerrar la conexión
    await connection.end();
  }
};
