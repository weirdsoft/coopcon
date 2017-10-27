import React from 'react'
import { connect } from 'react-redux'
import { compose, mapProps, setDisplayName } from 'recompose'
import { goToOperatives, goToProductGallery, OPERATIVES, PRODUCT_GALLERY } from 'data/route/actions'
import { getCurrentRoute } from 'data/route/selectors'
import { getCurrentId } from 'data/producer/selectors'
import { NavLink } from 'redux-first-router-link'
import ProductGallery from './ProductGallery'
import Operatives from './Operatives'

const pageToComponent = {
  [OPERATIVES]: Operatives,
  [PRODUCT_GALLERY]: ProductGallery,
}

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  currentRoute: getCurrentRoute(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  mapProps(({ currentRoute, ...props }) => ({
    ...props,
    Page: pageToComponent[currentRoute],
  })),
  setDisplayName('ProducerAdmin'),
)

const ProducerAdmin = enhancer(({ producerId, Page }) => (
  <div className="card">
    <div className="card-header">
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <NavLink
            to={goToOperatives(producerId)}
            className="nav-link"
            activeClassName='active'
            isActive={(match, location) => location.type === OPERATIVES}
          >
            Operativos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={goToProductGallery(producerId)}
            className="nav-link"
            activeClassName='active'
            isActive={(match, location) => location.type === PRODUCT_GALLERY}
          >
            Productos
          </NavLink>
        </li>
      </ul>
    </div>
    <Page />
  </div>
))

export default ProducerAdmin
