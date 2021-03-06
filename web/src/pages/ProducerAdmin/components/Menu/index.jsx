import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { goToOperations } from 'data/route/actions'
import { isLoadingProducers, getSortedProducers } from 'data/producer/selectors'
import { NavLink } from 'redux-first-router-link'
import ProducerAdd from '../ProducerAdd'

const Menu = ({ producers }) => (
  <ul className="nav nav-pills flex-column">
    {producers.map(({ _id, name }) => (
      <li
        key={_id}
        className="nav-item"
      >
        <NavLink
          to={goToOperations(_id)}
          className="nav-link"
          activeClassName='active'
          isActive={(match, location) => location.payload.producerId === _id}
        >
          {name}
        </NavLink>
      </li>
    ))}
    <li>
      <ProducerAdd />
    </li>
  </ul>
)

Menu.propTypes = {
  producers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
}

const mapStateToProps = (state) => ({
  isLoading: isLoadingProducers(state),
  producers: getSortedProducers(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    ({ isLoading }) => isLoading,
    renderNothing,
  ),
)

export default enhancer(Menu)
