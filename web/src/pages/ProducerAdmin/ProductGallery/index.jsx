import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getCurrentProducer } from 'data/producer/selectors'
import Product from './components/Product'
import ProductAdd from './components/ProductAdd'

const mapStateToProps = (state) => ({
  producer: getCurrentProducer(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('producer'),
  setDisplayName('ProductGallery'),
)

const ProductGallery = enhancer(({ products }) => (
  <div className="card-body">
    <div className="row">
      {products == null ? null : products.map((productId) => (
        <div key={productId} className="col-12 col-md-6 col-lg-4 mb-4">
          <Product productId={productId} />
        </div>
      ))}
      <div className="col-12 col-md-6 col-lg-4 mb-4">
        <ProductAdd />
      </div>
    </div>
  </div>
))

export default ProductGallery
