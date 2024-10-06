import { getItems, createItem } from '../api/services/itemService';
import axios from 'axios';
jest.mock('axios');

describe('Item Service', () => {
  it('should retrieve items and SWAPI data', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { results: [{ name: 'Luke Skywalker' }] } });
    
    const items = await getItems();
    
    expect(items.length).toBeGreaterThan(0);
    expect(items).toContainEqual(expect.objectContaining({ name: 'Luke Skywalker' }));
  });

  it('should create a new item', async () => {
    const newItem = await createItem({ name: 'Test Item', description: 'A test item description' });
    expect(newItem).toHaveProperty('id');
    expect(newItem.name).toBe('Test Item');
  });
});
