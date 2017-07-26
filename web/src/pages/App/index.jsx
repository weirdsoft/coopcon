import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { callOnMount } from 'hocs'
import { fetchProducers } from 'data/producer/actions'
import Menu from './Menu'

const App = () => (
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
      </main>
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  fetchProducers: () => dispatch(fetchProducers()),
})

const enhancer = compose(
  connect(null, mapDispatchToProps),
  callOnMount('fetchProducers'),
)

export default enhancer(App)
