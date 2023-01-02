import { FastifyInstance } from 'fastify';
import { registerHealthCheck } from './healthcheck';

export const registerRoutes = (app: FastifyInstance) => {
  registerHealthCheck(app);
}