import { defineEventHandler } from 'h3';

export default defineEventHandler(({ context }) => ({
  d1: context,
}));
