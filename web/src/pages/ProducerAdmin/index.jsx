import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, mapProps, setDisplayName } from 'recompose'
import {
  goToOperations, goToProductGallery, OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS,
  PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
} from 'data/route/actions'
import { getCurrentRoute } from 'data/route/selectors'
import { getCurrentId } from 'data/producer/selectors'
import { NavLink } from 'redux-first-router-link'
import ProductGallery from './ProductGallery'
import Operations from './Operations'
import styles from './styles.scss'

const pageToComponent = {
  [OPERATIONS]: Operations,
  [OPERATION_ADD]: Operations,
  [OPERATION_PRODUCTS]: Operations,
  [PRODUCT_GALLERY]: ProductGallery,
  [PRODUCT_ADD]: ProductGallery,
  [PRODUCT_EDIT]: ProductGallery,
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
  <div className={classNames('card', styles.producerAdmin)}>
    <div className="card-header">
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <NavLink
            to={goToOperations(producerId)}
            className="nav-link"
            activeClassName='active'
            isActive={(match, location) => (
              [ OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS ].includes(location.type)
            )}
          >
            Operativos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={goToProductGallery(producerId)}
            className="nav-link"
            activeClassName='active'
            isActive={(match, location) => [
              PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
            ].includes(location.type)}
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
