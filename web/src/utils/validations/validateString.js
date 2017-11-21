const validateString = (value, defaultValue = null) => {
  value = value.trim()

  if (value !== '') {
    return value
  } else {
    return defaultValue
  }
}

export default validateString
