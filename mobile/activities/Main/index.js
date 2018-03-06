import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { getMainStack } from 'Coopcon/data/navigation/selectors'
import { MainStack } from 'Coopcon/data/navigation/navigators'

const mapStateToProps = (state) => ({
  mainStack: getMainStack(state),
  addListener: createReduxBoundAddListener('mainStack'),
})

const enhancer = compose(
  connect(mapStateToProps),
  setDisplayName('Main'),
)

const Main = enhancer(({ mainStack, addListener, dispatch }) => (
  <MainStack
    navigation={addNavigationHelpers({
      state: mainStack,
      dispatch,
      addListener,
    })}
  />
))

export default Main
