import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { goToProductGallery } from 'data/route/actions'
import { isLoadingProducers, getProducers } from 'data/producer/selectors'
import Link from 'redux-first-router-link'
import AddProductor from './components/AddProductor'

const Menu = ({ producers }) => (
  <aside className="menu column is-one-quarter">
    <p className="menu-label">
      Productores
    </p>
    <ul className="menu-list">
      {producers.map((producer) => (
        <li key={producer._id}>
          <Link to={goToProductGallery(producer._id)}>
            {producer.name}
          </Link>
        </li>
      ))}
      <li>
        <AddProductor />
      </li>
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
