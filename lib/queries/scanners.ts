export const SCANNERS_LIST_QUERY = `
  *[_type == "appScanner"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    domain,
    url,
    technology,
    verdictRating,
    verdict,
    worthItFor,
    notForYouIf
  }
`

export const SCANNER_BY_SLUG_QUERY = `
  *[_type == "appScanner" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    technology,
    whatItActuallyDoes,
    researchAccuracy,
    knownLimitations,
    conflictOfInterest,
    verdictRating,
    verdict,
    worthItFor,
    notForYouIf,
    citations
  }
`

export const SCANNER_SLUGS_QUERY = `
  *[_type == "appScanner"] { "slug": slug.current }
`
