export const SUNSCREEN_BRANDS_QUERY = `
  *[_type == "sunscreenBrand"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    origin,
    uvFilters,
    uvaProtection,
    uvbSpf,
    formulationType,
    availableInUS,
    importRequired,
    notes,
    citations
  }
`
