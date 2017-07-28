import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, withHandlers, flattenProp } from 'recompose'
import {
  showAddNewProducer, hideAddNewProducer, changeNewProducerName, createNewProducer,
} from 'data/producer/actions'
import { isAddingNewProducer, getNewProducer } from 'data/producer/selectors'

const AddProducerLink = ({ onShow }) => (
  <a onClick={onShow}>
    Agregar Productor
  </a>
)

AddProducerLink.propTypes = {
  onShow: PropTypes.func.isRequired,
}

const AddProducer = ({ name, onKeyDown, onChange }) => (
  <a className="control" >
    <input
      className="input"
      type="text"
      value={name}
      onKeyDown={onKeyDown}
      onChange={onChange}
      autoFocus
    />
  </a>
)

AddProducer.propTypes = {
  name: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
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
    renderComponent(AddProducerLink),
  ),
  withHandlers({
    onKeyDown: ({ onCreate, onHide, producer }) => (event) => {
      if (event.key === 'Enter' && producer.name.trim() !== '') {
        onCreate()
        onHide()
      } else if (event.key === 'Escape') {
        onHide()
      }
    },
    onChange: ({ onChange }) => (event) => onChange(event.target.value),
  }),
  flattenProp('producer'),
)

export default enhancer(AddProducer)
