import React from 'react'
import { connect } from 'react-redux'
import { compose, mapProps, renderNothing, setDisplayName } from 'recompose'
import { callOnMount } from 'hocs'
import { getMainRoute } from 'data/route/selectors'
import { PRODUCT_GALLERY } from 'data/route/actions'
import { fetchProducers } from 'data/producer/actions'
import Menu from './Menu'
import ProductGallery from 'pages/ProductGallery'

const pageToComponent = {
  [PRODUCT_GALLERY]: ProductGallery,
}

const mapStateToProps = (state) => ({
  mainRoute: getMainRoute(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducers: () => dispatch(fetchProducers()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  callOnMount('fetchProducers'),
  mapProps(({ mainRoute }) => ({
    Page: pageToComponent[mainRoute] || renderNothing(),
  })),
  setDisplayName('App'),
)

const App = enhancer(({ Page }) => (
  <div className="container is-fluid">
    <header>
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          Cooperativa de Consumo
        </div>
      </nav>
    </header>
    <div className="columns">
      <Menu />
      <main className="column">
        <Page />
      </main>
    </div>
  </div>
))

export default App
