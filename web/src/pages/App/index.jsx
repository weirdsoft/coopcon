import React from 'react'
import { connect } from 'react-redux'
import { compose, mapProps, renderNothing, setDisplayName } from 'recompose'
import classNames from 'classnames'
import { getCurrentRoute } from 'data/route/selectors'
import {
  OPERATIONS, OPERATION_ADD, OPERATION_EDIT, OPERATION_PRODUCTS, OPERATION_TOTALS,
  PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
} from 'data/route/actions'
import styles from './styles.scss'
import Menu from './components/Menu'
import NavBar from './components/NavBar'
import ProducerAdmin from 'pages/ProducerAdmin'

const pageToComponent = {
  [OPERATIONS]: ProducerAdmin,
  [OPERATION_ADD]: ProducerAdmin,
  [OPERATION_EDIT]: ProducerAdmin,
  [OPERATION_PRODUCTS]: ProducerAdmin,
  [OPERATION_TOTALS]: ProducerAdmin,
  [PRODUCT_GALLERY]: ProducerAdmin,
  [PRODUCT_ADD]: ProducerAdmin,
  [PRODUCT_EDIT]: ProducerAdmin,
}

const mapStateToProps = (state) => ({
  currentRoute: getCurrentRoute(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  mapProps(({ currentRoute }) => ({
    Page: pageToComponent[currentRoute] || renderNothing(),
  })),
  setDisplayName('App'),
)

const App = enhancer(({ Page }) => (
  <div className={styles.app}>
    <header>
      <NavBar />
    </header>
    <div className={classNames('container-fluid', styles.content)}>
      <div className="row">
        <aside className="col-3 bg-light">
          <Menu />
        </aside>
        <main className="col-9 d-flex align-items-stretch pb-3">
          <Page />
        </main>
      </div>
    </div>
  </div>
))

export default App
