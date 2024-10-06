import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getItems, createItem } from '../api/services/itemService';
import { getItemHandler, createItemHandler } from '../api/controllers/itemController';

jest.mock('../services/itemService');

describe('Item Controller', () => {
  const mockEvent = (body = {}): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    headers: {},
    httpMethod: 'POST',
    isBase64Encoded: false,
    path: '/',
    pathParameters: {},
    queryStringParameters: {},
    requestContext: {},
    resource: '/',
  }) as APIGatewayProxyEvent;

  const mockResponse = (): Partial<APIGatewayProxyResult> => {
    return {
      statusCode: 200,
      body: '',
    };
  };

  it('should retrieve items and return them as JSON', async () => {
    const event = mockEvent();
    const result = await getItemHandler(event);

    const mockItems = [{ id: 1, name: 'Test Item' }];
    (getItems as jest.Mock).mockResolvedValue(mockItems);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockItems);
  });

  it('should create a new item and return it as JSON', async () => {
    const body = { name: 'New Item', description: 'A new item description' };
    const event = mockEvent(body);

    const mockNewItem = { id: 2, name: 'New Item', description: 'A new item description' };
    (createItem as jest.Mock).mockResolvedValue(mockNewItem);

    const result = await createItemHandler(event);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual(mockNewItem);
  });

  it('should return a 400 error if the item creation request is missing required fields', async () => {
    const event = mockEvent(); // Cuerpo vacío
    const result = await createItemHandler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({ message: 'Name and description are required' });
  });

  it('should return a 500 error if an error occurs while retrieving items', async () => {
    const event = mockEvent();

    (getItems as jest.Mock).mockRejectedValue(new Error('Database error'));

    const result = await getItemHandler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ message: 'Error retrieving items', error: 'Database error' });
  });

  it('should return a 500 error if an error occurs while creating an item', async () => {
    const body = { name: 'New Item', description: 'A new item description' };
    const event = mockEvent(body);

    (createItem as jest.Mock).mockRejectedValue(new Error('Database error'));

    const result = await createItemHandler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ message: 'Error creating item', error: 'Database error' });
  });
});
