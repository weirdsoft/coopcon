const validateInt = (value, defaultValue = null, min = null) => {
  value = parseInt(value)

  if (!isNaN(value) && (min == null || value >= min)) {
    return value
  } else {
    return defaultValue
  }
}

export default validateInt
