// schemas/color.ts

import {defineField,defineType} from 'sanity'

export default defineType({
  name:'color',
  title:'Colors',
  type:'document',

  fields: [
defineField({
      name:'colorCode',
      title:'Color Code',
      type:'string',
      description:'Example: #FF0000',
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'name',
      title:'Color Name',
      type:'string',
      validation:Rule =>Rule.required(),
    }),
  ],

  preview: {
    select: {
      title:'name',
    },
  },
})