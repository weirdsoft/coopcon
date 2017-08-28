import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { goToProductGallery } from 'data/route/actions'
import { isLoadingProducers, getProducers } from 'data/producer/selectors'
import Link from 'redux-first-router-link'
import AddProductor from './components/AddProductor'

const Menu = ({ producers }) => (
  <ul className="nav flex-column">
    {producers.map((producer) => (
      <li
        key={producer._id}
        className="nav-item"
      >
        <Link
          to={goToProductGallery(producer._id)}
          className="nav-link"
        >
          {producer.name}
        </Link>
      </li>
    ))}
    <li>
      <AddProductor />
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
