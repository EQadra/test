import * as mysql from 'mysql2/promise';
import { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';

export const query = async (sql: string, params: any[] = []): Promise<[RowDataPacket[] | OkPacket, ResultSetHeader]> => {
  // Crear la conexión a la base de datos
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  try {
    // Ejecutar la consulta
    const [results, metadata] = await connection.execute(sql, params);

    // Aquí determinamos el tipo de `results` basado en la consulta
    if (sql.startsWith('SELECT')) {
      return [results as RowDataPacket[], metadata as ResultSetHeader]; // Para SELECT
    } else {
      return [results as OkPacket, metadata as ResultSetHeader]; // Para INSERT, UPDATE, DELETE
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error; // Lanza el error para manejarlo más arriba en la cadena
  } finally {
    // Asegurarse de cerrar la conexión
    await connection.end();
  }
};
