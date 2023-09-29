import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  console.log(event.context);

  return {
    d1: event.context,
  };
});
