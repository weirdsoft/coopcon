import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let Action = ({ disabled, callback, text, icon, type='primary' }) => (
  <button
    className={classNames('btn', `btn-${type}`)}
    disabled={disabled}
    onClick={callback}
  >
    <span className="icon is-small">
      <i className={classNames('fa', `fa-${icon}`)} />
      &nbsp;{text}
    </span>
  </button>
)

Action.propTypes = {
  disabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string,
}

export default Action
