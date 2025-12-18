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

import { GET } from '../../api/categories/route';
import { NextRequest } from 'next/server';

// Mock the categories data
jest.mock('@/data/categories.json', () => [
  { id: 1, name: 'Category 1', icon: '/icon1.svg' },
  { id: 2, name: 'Category 2', icon: '/icon2.svg' },
]);

describe('/api/categories', () => {
  it('should return categories', async () => {
    const request = new NextRequest('http://localhost:3000/api/categories');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('icon');
  });
});

