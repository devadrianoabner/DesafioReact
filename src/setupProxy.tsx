import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function setupProxy(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://6288144910e93797c1564f40.mockapi.io',
      changeOrigin: true,
    })
  );
}