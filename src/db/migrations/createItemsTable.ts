import { query } from '../../db/dbConfig';

export const createItemsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    )
  `;
  await query(sql);
};
