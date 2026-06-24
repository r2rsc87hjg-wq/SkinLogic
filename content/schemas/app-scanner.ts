import { defineField, defineType } from 'sanity'

export const appScannerSchema = defineType({
  name: 'appScanner',
  title: 'App / Scanner',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'App or Tool Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'domain', title: 'Domain', type: 'string', description: 'e.g. curology.com — used for logo lookup' }),
    defineField({ name: 'url', title: 'Website / App URL', type: 'url', description: 'Direct link to the app or website' }),
    defineField({ name: 'technology', title: 'Technology Used', type: 'string', description: 'e.g. AI image analysis, questionnaire, spectrometry' }),
    defineField({ name: 'whatItActuallyDoes', title: 'What it actually does technically', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'researchAccuracy', title: 'What peer-reviewed research says about accuracy', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'knownLimitations', title: 'Known limitations the company does not advertise', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'conflictOfInterest', title: 'Who funded the studies they cite', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'verdictRating',
      title: 'Verdict Rating',
      type: 'string',
      options: {
        list: [
          { title: 'Worth it — with caveats', value: 'worth-it' },
          { title: 'Limited value', value: 'limited' },
          { title: 'Depends on your goal', value: 'depends' },
          { title: 'Not recommended', value: 'not-recommended' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'verdict', title: 'Plain English verdict', type: 'text', rows: 4 }),
    defineField({ name: 'worthItFor', title: 'Worth it for (specific use cases)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'notForYouIf', title: 'Not worth it if...', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'citations', title: 'Citations', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'url', type: 'url', title: 'URL' }] }] }),
  ],
})
