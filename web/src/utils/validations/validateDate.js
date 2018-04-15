import moment from 'moment'

const validateDate = (value, defaultValue = null) => {
  value = moment(value)

  if (value.isValid()) {
    return value.valueOf()
  } else {
    return defaultValue
  }
}

export default validateDate
