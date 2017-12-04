import React from 'react'
import { connect } from 'react-redux'
import { compose, mapProps, setDisplayName } from 'recompose'
import {
  goToOperations, goToProductGallery, OPERATIONS, OPERATION_ADD, PRODUCT_GALLERY, PRODUCT_ADD,
} from 'data/route/actions'
import { getCurrentRoute } from 'data/route/selectors'
import { getCurrentId } from 'data/producer/selectors'
import { NavLink } from 'redux-first-router-link'
import ProductGallery from './ProductGallery'
import Operations from './Operations'

const pageToComponent = {
  [OPERATIONS]: Operations,
  [OPERATION_ADD]: Operations,
  [PRODUCT_GALLERY]: ProductGallery,
  [PRODUCT_ADD]: ProductGallery,
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
            to={goToOperations(producerId)}
            className="nav-link"
            activeClassName='active'
            isActive={(match, location) => [ OPERATIONS, OPERATION_ADD ].includes(location.type)}
          >
            Operativos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={goToProductGallery(producerId)}
            className="nav-link"
            activeClassName='active'
            isActive={(match, location) => [ PRODUCT_GALLERY, PRODUCT_ADD ].includes(location.type)}
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
