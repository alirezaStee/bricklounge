/**
 * @jest-environment node
 */

// Polyfill for Web APIs in Node.js environment
import { Request, Response, Headers } from 'undici';

if (!global.Request) {
  global.Request = Request as any;
  global.Response = Response as any;
  global.Headers = Headers as any;
}

import { GET } from '../../api/items/[id]/route';
import { NextRequest } from 'next/server';

// Mock the items data
jest.mock('@/data/items.json', () => ({
  '1': [
    {
      id: '1',
      name: 'Item 1',
      price: 1000,
      image: '/item1.jpg',
      description: 'Description 1',
    },
  ],
  '2': [
    {
      id: '2',
      name: 'Item 2',
      price: 2000,
      image: '/item2.jpg',
      description: 'Description 2',
    },
  ],
}));

describe('/api/items/[id]', () => {
  it('should return items for a category', async () => {
    const request = new NextRequest('http://localhost:3000/api/items/1');
    const response = await GET(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('price');
  });

  it('should return empty array for non-existent category', async () => {
    const request = new NextRequest('http://localhost:3000/api/items/999');
    const response = await GET(request, {
      params: Promise.resolve({ id: '999' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});

