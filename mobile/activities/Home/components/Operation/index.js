import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { StyleSheet, View, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Divider, TouchableRipple } from 'react-native-paper'
import { goToOperation } from 'Coopcon/data/navigation/actions'
import { getOperation } from 'Coopcon/data/operation/selectors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: 'white',
  },
  name: {
    flex: 1,
  },
})

const mapStateToProps = (state, { id }) => ({
  operation: getOperation(state, id),
})

const mapDispatchToProps = (dispatch, { id }) => ({
  goToOperation: () => dispatch(goToOperation(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('operation'),
  setDisplayName('Operation'),
)

const Operation = enhancer(({ name, goToOperation }) => (
  <View>
    <TouchableRipple
      onPress={goToOperation}
    >
      <View
        style={styles.container}
      >
        <Text style={styles.name}>{name}</Text>
        <SimpleLineIcons name="arrow-right" size={20}/>
      </View>
    </TouchableRipple>
    <Divider/>
  </View>
))

export default Operation
