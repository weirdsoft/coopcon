import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { isLoadingProducers, getProducers } from 'data/producer/selectors'

const Menu = ({ producers }) => (
  <aside className="menu column is-one-quarter">
    <p className="menu-label">
      Productores
    </p>
    <ul className="menu-list">
      {producers.map((producer) => (
        <li key={producer._id}>
          {producer.name}
        </li>
      ))}
    </ul>
  </aside>
)

Menu.propTypes = {
  producers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
}

const mapStateToProps = (state) => ({
  isLoading: isLoadingProducers(state),
  producers: getProducers(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    ({ isLoading }) => isLoading,
    renderNothing,
  ),
)

export default enhancer(Menu)
