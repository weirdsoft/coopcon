const coalesce = (first, ...rest) =>
  first != null || rest.length === 0 ? first : coalesce(...rest)

export default coalesce
