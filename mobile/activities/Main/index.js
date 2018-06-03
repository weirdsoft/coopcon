import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle, setDisplayName } from 'recompose'
import { BackHandler } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { getMainStack } from 'Coopcon/data/navigation/selectors'
import { MainStack } from 'Coopcon/data/navigation/navigators'
import ConfirmationDialog from './components/ConfirmationDialog'

const mapStateToProps = (state) => ({
  mainStack: getMainStack(state),
  addListener: createReduxBoundAddListener('mainStack'),
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(NavigationActions.back()),
  dispatch,
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onBackPress: ({ mainStack, goBack }) => () => {
      if (mainStack.index !== 0) {
        goBack()
      }

      return mainStack.index !== 0
    },
  }),
  lifecycle({
    componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", this.props.onBackPress)
    },
    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.props.onBackPress)
    },
  }),
  setDisplayName('Main'),
)

const Main = enhancer(({ mainStack, addListener, dispatch }) => [
  <MainStack
    key="main"
    navigation={addNavigationHelpers({
      state: mainStack,
      dispatch,
      addListener,
    })}
  />,
  <ConfirmationDialog key="confirmation" />,
])

export default Main
