import React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'
import { goToIndex } from 'data/route/actions'
import Link from 'redux-first-router-link'

const NavBar = () => (
  <nav className={classNames('navbar', 'navbar-dark', 'bg-primary', styles.navbar)}>
    <Link to={goToIndex()} className="navbar-brand">
      Cooperativa de Consumo
    </Link>
  </nav>
)

export default NavBar
