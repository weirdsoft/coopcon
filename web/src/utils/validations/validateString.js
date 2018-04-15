const validateString = (value, defaultValue = null) => {
  if (value.trim() !== '') {
    return value
  } else {
    return defaultValue
  }
}

export default validateString
