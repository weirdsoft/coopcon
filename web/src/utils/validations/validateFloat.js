const validateFloat = (value, defaultValue = null, min = null) => {
  value = parseFloat(value)

  if (!isNaN(value) && (min == null || value >= min)) {
    return value
  } else {
    return defaultValue
  }
}

export default validateFloat
