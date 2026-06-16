// GROQ queries for the Ingredient Explainer (Tool 2).
// List query fetches only the fields needed for cards — keeps the index fast.
// Full query fetches everything for the individual deep-dive page.

export const INGREDIENTS_LIST_QUERY = `
  *[_type == "ingredient"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    summary,
    studyTypes
  }
`

export const INGREDIENT_BY_SLUG_QUERY = `
  *[_type == "ingredient" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    summary,
    biologicalMechanism,
    researchSummary,
    studyTypes,
    evidenceBasedConcentration,
    marketingClaims,
    honestVerdict,
    citations,
    "relatedIngredients": relatedIngredients[]-> {
      name,
      "slug": slug.current,
      summary
    }
  }
`

export const INGREDIENT_SLUGS_QUERY = `
  *[_type == "ingredient"] { "slug": slug.current }
`
