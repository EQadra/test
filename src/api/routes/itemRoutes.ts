import { getItemHandler, createItemHandler } from '../controllers/itemController';

export const routes = {
  get: {
    handler: getItemHandler,
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
    handler: createItemHandler,
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
