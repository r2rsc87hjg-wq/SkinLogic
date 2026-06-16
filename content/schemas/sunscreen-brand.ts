import { defineField, defineType } from 'sanity'

export const sunscreenBrandSchema = defineType({
  name: 'sunscreenBrand',
  title: 'Sunscreen Brand',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Brand Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'origin', title: 'Country of Origin / Regulatory Market', type: 'string' }),
    defineField({ name: 'uvFilters', title: 'UV Filters Used', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'uvaProtection', title: 'UVA Protection Rating / PA system', type: 'string' }),
    defineField({ name: 'uvbSpf', title: 'UVB SPF Rating', type: 'number' }),
    defineField({ name: 'formulationType', title: 'Formula Type', type: 'string', options: { list: ['Chemical', 'Mineral', 'Hybrid'] } }),
    defineField({ name: 'availableInUS', title: 'Available in the US', type: 'boolean' }),
    defineField({ name: 'importRequired', title: 'Import required for US consumers', type: 'boolean' }),
    defineField({ name: 'notes', title: 'Notes (honest assessment)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'citations', title: 'Citations', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'url', type: 'url', title: 'URL' }] }] }),
  ],
})
