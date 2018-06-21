import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, mapProps, setDisplayName } from 'recompose'
import {
  goToOperations, goToProductGallery, OPERATIONS, OPERATION_ADD, OPERATION_EDIT,
  OPERATION_PRODUCTS, OPERATION_TOTALS, PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
} from 'data/route/actions'
import { getCurrentRoute } from 'data/route/selectors'
import { getCurrentId } from 'data/producer/selectors'
import { NavLink } from 'redux-first-router-link'
import Menu from './components/Menu'
import ProductGallery from './ProductGallery'
import Operations from './Operations'
import styles from './styles.scss'

const pageToComponent = {
  [OPERATIONS]: Operations,
  [OPERATION_ADD]: Operations,
  [OPERATION_EDIT]: Operations,
  [OPERATION_PRODUCTS]: Operations,
  [OPERATION_TOTALS]: Operations,
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
  <div className="row">
    <aside className="col-3 bg-light">
      <Menu />
    </aside>
    <main className="col-9 d-flex align-items-stretch pb-3">
      <div className={classNames('card', styles.producerAdmin)}>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <NavLink
                to={goToOperations(producerId)}
                className="nav-link"
                activeClassName='active'
                isActive={(match, location) => (
                  [
                    OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS, OPERATION_TOTALS,
                  ].includes(location.type)
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
    </main>
  </div>
))

export default ProducerAdmin
