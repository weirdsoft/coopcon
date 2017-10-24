import React from 'react'
import { connect } from 'react-redux'
import { compose, mapProps, renderNothing, setDisplayName } from 'recompose'
import classNames from 'classnames'
import { getMainRoute } from 'data/route/selectors'
import { PRODUCT_GALLERY } from 'data/route/actions'
import styles from './styles.scss'
import Menu from './Menu'
import NavBar from './NavBar'
import ProductGallery from 'pages/ProductGallery'

const pageToComponent = {
  [PRODUCT_GALLERY]: ProductGallery,
}

const mapStateToProps = (state) => ({
  mainRoute: getMainRoute(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  mapProps(({ mainRoute }) => ({
    Page: pageToComponent[mainRoute] || renderNothing(),
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
        <main className="col">
          <Page />
        </main>
      </div>
    </div>
  </div>
))

export default App
