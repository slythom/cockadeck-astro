import { defineDb, defineTable, column } from 'astro:db';

const Cards = defineTable({
  columns: {
    quantity: column.number(),
    setcode: column.text(),
    collectornumber: column.text(),
    name: column.text(),

  }
})

export default defineDb({
  tables: { Cards },
})