import { routes } from './api/routes/itemRoutes';
import { createItemsTable } from './db/migrations/createItemsTable';

const init = async () => {
  await createItemsTable();
  console.log('Items table created and ready.');
};

init();

// Exporta las funciones para los endpoints
export const getItem = routes.get.handler; // Cambia esto para usar handler
export const createItem = routes.post.handler; // Cambia esto para usar handler
