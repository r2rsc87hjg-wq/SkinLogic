import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './content/schemas'

export default defineConfig({
  name: 'skinclear',
  title: 'SkinClear CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '2tp3y9nq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
