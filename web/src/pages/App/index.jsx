import React from 'react'
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

export default App
