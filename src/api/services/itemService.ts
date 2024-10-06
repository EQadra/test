import { query } from '../../db/dbConfig';
import { translateAttributes } from '../../utils/translation';
import axios from 'axios';

export const getItems = async () => {
  const sql = 'SELECT * FROM items';
  const [items]: [RowDataPacket[], ResultSetHeader] = await query(sql); // Desestructuramos el resultado

  // Ahora 'items' es un arreglo de 'RowDataPacket', así que puedes mapear sobre él
  const translatedItems = items.map((item: any) => translateAttributes(item));

  const swapiData = await axios.get('https://swapi.dev/api/people');
  const swapiPeople = swapiData.data.results.map((person: any) => translateAttributes(person));

  return [...translatedItems, ...swapiPeople];
};

export const createItem = async (data: any) => {
  const translatedData = translateAttributes(data, 'toDB');
  const sql = `INSERT INTO items (name, description) VALUES ('${translatedData.name}', '${translatedData.description}')`;
  const result = await query(sql);
  
  // El resultado de una inserción también puede ser un 'OkPacket'
  return { id: result.insertId, ...data };
};
