import { defineField, defineType } from 'sanity'

export const ingredientSchema = defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Ingredient Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'summary', title: 'Plain English Summary (3–4 sentences)', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'biologicalMechanism', title: 'What it does at a biological level', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'researchSummary', title: 'What the research actually shows', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'studyTypes', title: 'Study Types Available', type: 'array', of: [{ type: 'string' }], options: { list: ['In vitro', 'Animal', 'Human clinical trial', 'Meta-analysis', 'Case report'] } }),
    defineField({ name: 'evidenceBasedConcentration', title: 'Evidence-based concentration range', type: 'string' }),
    defineField({ name: 'marketingClaims', title: 'What brands commonly exaggerate', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'honestVerdict', title: 'Honest bottom line', type: 'text', rows: 3 }),
    defineField({ name: 'citations', title: 'Citations (PubMed, AAD, BJD, etc.)', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'url', type: 'url', title: 'URL' }] }] }),
    defineField({ name: 'relatedIngredients', title: 'Related Ingredients', type: 'array', of: [{ type: 'reference', to: [{ type: 'ingredient' }] }] }),
  ],
})
