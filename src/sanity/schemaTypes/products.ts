// schemas/product.ts

import {defineField,defineType} from 'sanity'

export default defineType({
  name:'product',
  title:'Products',
  type:'document',

  fields: [
defineField({
      name:'productId',
      title:'Product ID',
      type:'string',
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'name',
      title:'Product Name',
      type:'string',
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'description',
      title:'Description',
      type:'text',
    }),

defineField({
      name:'company',
      title:'Company',
      type:'reference',
      to: [{type:'company'}],
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'category',
      title:'Category',
      type:'reference',
      to: [{type:'category'}],
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'size',
      title:'Size',
      type:'string',
    }),

defineField({
      name:'mrp',
      title:'MRP',
      type:'number',
    }),

defineField({
      name:'price',
      title:'Selling Price',
      type:'number',
    }),

defineField({
      name:'discount',
      title:'Discount (%)',
      type:'number',
    }),

defineField({
      name:'colors',
      title:'Colors',
      type:'array',
      of: [
        {
          type:'reference',
          to: [{type:'color'}],
        },
      ],
    }),

defineField({
      name:'image',
      title:'Image',
      type:'image',
      options: {hotspot:true},
    }),

defineField({
      name:'featured',
      title:'Featured Offer',
      type:'boolean',
      initialValue:true,
    }),
  ],

  preview: {
    select: {
      title:'name',
      media:'image',
    },
  },
})