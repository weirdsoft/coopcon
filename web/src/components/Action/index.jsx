import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.scss'

let Action = ({ disabled, callback, icon, className }) => (
  <button
    className={classNames('button', 'is-white', 'is-paddingless', styles.action, className)}
    disabled={disabled}
    onClick={callback}
  >
    <span className="icon is-small">
      <i className={classNames('fa', `fa-${icon}`)} />
    </span>
  </button>
)

Action.propTypes = {
  disabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Action
