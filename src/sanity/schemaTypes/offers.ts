// schemas/offer.ts

import {defineField,defineType} from 'sanity'

export default defineType({
  name:'offer',
  title:'Offers',
  type:'document',

  fields: [
defineField({
      name:'offerId',
      title:'Offer ID',
      type:'string',
      validation:Rule =>Rule.required(),
    }),

defineField({
      name:'title',
      title:'Title',
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
    }),

defineField({
      name:'discount',
      title:'Discount (%)',
      type:'number',
    }),

defineField({
      name:'image',
      title:'Offer Image',
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
      title:'title',
      media:'image',
    },
  },
})