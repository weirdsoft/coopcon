import React from 'react'
import { connect } from 'react-redux'
import { compose, mapProps, renderNothing, setDisplayName } from 'recompose'
import { callOnMount } from 'hocs'
import { getMainRoute } from 'data/route/selectors'
import { PRODUCT_GALLERY } from 'data/route/actions'
import { fetchProducers } from 'data/producer/actions'
import Menu from './Menu'
import NavBar from './NavBar'
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
  <div>
    <header>
      <NavBar />
    </header>
    <div className="container-fluid">
      <div className="row">
        <aside className="col-3">
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
