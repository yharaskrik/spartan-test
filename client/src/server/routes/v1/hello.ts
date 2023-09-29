import { defineEventHandler } from 'h3';

export default defineEventHandler(({ context: { cloudflare } }) => ({
  d1: cloudflare.env.D1,
}));
