// schemas/company.ts

import {defineField, defineType} from 'sanity'

export default defineType({
  name:'company',
  title:'Company',
  type:'document',

  fields: [
defineField({
      name:'companyId',
      title:'Company ID',
      type:'string',
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'name',
      title:'Company Name',
      type:'string',
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'image',
      title:'Logo',
      type:'image',
      options: {hotspot:true},
    }),

defineField({
      name:'categoriesAvailable',
      title:'Categories Available',
      type:'array',
      of: [
        {
          type:'reference',
          to: [{type:'category'}],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title:'name',
      media:'image',
    },
  },
})