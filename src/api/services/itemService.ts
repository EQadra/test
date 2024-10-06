import { query } from '../../db/dbConfig'; // Asegúrate de que esto exporta tu función de consulta
import { translateAttributes } from '../../utils/translation';
import { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2'; // Solo importa los tipos necesarios
import axios from 'axios';

export const getItems = async () => {
  const sql = 'SELECT * FROM items';

  // Llama a la consulta y desestructura el resultado
  const [items]: [RowDataPacket[], ResultSetHeader] = await query(sql); // Desestructura el resultado en items y metadata

  // Mapea los elementos a sus versiones traducidas
  const translatedItems = items.map((item: RowDataPacket) => translateAttributes(item));

  const swapiData = await axios.get('https://swapi.dev/api/people');
  const swapiPeople = swapiData.data.results.map((person: any) => translateAttributes(person));

  return [...translatedItems, ...swapiPeople];
};

export const createItem = async (data: any) => {
  const translatedData = translateAttributes(data, 'toDB');
  const sql = `INSERT INTO items (name, description) VALUES (?, ?)`;
  
  // La consulta de inserción devolverá un tipo diferente
  const [result, metadata]: [OkPacket, ResultSetHeader] = await query(sql, [translatedData.name, translatedData.description]);

  // Puedes acceder a insertId a través de metadata
  return { id: result.insertId, ...data }; // Usa metadata para obtener el ID
};
