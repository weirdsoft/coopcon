import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getCurrentProducer } from 'data/producer/selectors'
import ProductWrapper from './components/ProductWrapper'
import ProductAdd from './components/ProductAdd'
import styles from './styles.scss'

const mapStateToProps = (state) => ({
  producer: getCurrentProducer(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('producer'),
  setDisplayName('ProductGallery'),
)

const ProductGallery = enhancer(({ products }) => (
  <div className={classNames('card-body', styles.productGallery)}>
    <div className="row">
      {products == null ? null : products.map((id) => (
        <div key={id} className="col-12 col-md-6 col-lg-4 mb-4">
          <ProductWrapper id={id} />
        </div>
      ))}
      <div className="col-12 col-md-6 col-lg-4 mb-4">
        <ProductAdd />
      </div>
    </div>
  </div>
))

export default ProductGallery
