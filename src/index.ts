import { routes } from './api/routes/itemRoutes';
import { createItemsTable } from './db/migrations/createItemsTable';

const init = async () => {
  await createItemsTable();
  console.log('Items table created and ready.');
};

init();

export const handler = {
  ...routes.get,
  ...routes.post,
};
