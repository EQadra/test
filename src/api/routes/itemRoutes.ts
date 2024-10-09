import { getItemHandler, createItemHandler } from '../controllers/itemController';

export const routes = {
  get: {
    handler: getItemHandler, // Esto debería apuntar al handler
    events: [
      {
        http: {
          path: 'items',
          method: 'get',
        },
      },
    ],
  },
  post: {
    handler: createItemHandler, // Esto debería apuntar al handler
    events: [
      {
        http: {
          path: 'items',
          method: 'post',
        },
      },
    ],
  },
};
