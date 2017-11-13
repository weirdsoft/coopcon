import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getCurrentProducer } from 'data/producer/selectors'
import Product from './components/Product'

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
    <div className="card-deck">
      {products == null ? null : products.map((productId) => (
        <Product key={productId} productId={productId}/>
      ))}
    </div>
  </div>
))

export default ProductGallery
