import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  compose, branch, renderComponent, mapProps, withProps, withHandlers, flattenProp, setDisplayName,
} from 'recompose'
import classNames from 'classnames'
import {
  showAddNewProducer, hideAddNewProducer, changeNewProducerName, createNewProducer,
} from 'data/producer/actions'
import { isAddingNewProducer, getNewProducer } from 'data/producer/selectors'
import styles from './styles.scss'

const ProducerAddLink = ({ onShow }) => (
  <a
    onClick={onShow}
    className={classNames('nav-link', styles.addProducer)}
  >
    Agregar Productor
  </a>
)

ProducerAddLink.propTypes = {
  onShow: PropTypes.func.isRequired,
}

const ProducerAdd = ({ name, isValid, onKeyDown, onChange, onCreate, onCancel }) => (
  <a className="nav-link input-group d-flex">
    <input
      className="form-control"
      type="text"
      placeholder="Nombre..."
      value={name}
      onKeyDown={onKeyDown}
      onChange={onChange}
      autoFocus
    />
    <div className="input-group-append">
      <button
        onClick={onCreate}
        type="button"
        className="btn btn-primary"
        disabled={!isValid}
      >
        <i className="fa fa-check" />
      </button>
      <button
        onClick={onCancel}
        type="button"
        className="btn btn-secondary"
      >
        <i className="fa fa-times" />
      </button>
    </div>
  </a>
)

ProducerAdd.propTypes = {
  name: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  show: isAddingNewProducer(state),
  producer: getNewProducer(state),
})

const mapDispatchToProps = (dispatch) => ({
  onShow: () => dispatch(showAddNewProducer()),
  onHide: () => dispatch(hideAddNewProducer()),
  onChange: (name) => dispatch(changeNewProducerName(name)),
  onCreate: () => dispatch(createNewProducer()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ show }) => !show,
    renderComponent(ProducerAddLink),
  ),
  mapProps(({ onCreate, onHide, onChange, ...props }) => ({
    ...props,
    onCancel: onHide,
    onCreate: () => {
      onCreate()
      onHide()
    },
    onChange: (event) => onChange(event.target.value),
  })),
  withProps(({ producer: { name } }) => ({
    isValid: name.trim() !== '',
  })),
  withHandlers({
    onKeyDown: ({ onCreate, onCancel, isValid }) => (event) => {
      if (event.key === 'Enter' && isValid) {
        onCreate()
      } else if (event.key === 'Escape') {
        onCancel()
      }
    },
  }),
  flattenProp('producer'),
  setDisplayName('ProducerAdd'),
)

export default enhancer(ProducerAdd)
