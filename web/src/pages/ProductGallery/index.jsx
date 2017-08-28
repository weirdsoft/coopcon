import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp } from 'recompose'
import { getCurrentProducer } from 'data/producer/selectors'

const mapStateToProps = (state) => ({
  producer: getCurrentProducer(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('producer'),
)

const ProductGallery = enhancer(({ name }) => (
  <div>
    <h2>
      Productos de <em>{name}</em>
    </h2>
  </div>
))

export default ProductGallery
