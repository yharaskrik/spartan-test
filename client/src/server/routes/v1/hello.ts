import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  console.log(globalThis);
  console.log(globalThis.__env__);

  return {
    d1: event.context,
  };
});
