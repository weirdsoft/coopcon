import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { StyleSheet, View } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Text, TouchableRipple } from 'react-native-paper'
import { goToOperation } from 'Coopcon/data/navigation/actions'
import { getProducer } from 'Coopcon/data/producer/selectors'
import { getOperation } from 'Coopcon/data/operation/selectors'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
  },
  name: {
    flexShrink: 1,
  },
  date: {
    flexGrow: 1,
    paddingRight: 5,
  },
})

const mapStateToProps = (state, { id }) => {
  const operation = getOperation(state, id)
  const producer = getProducer(state, operation.producer)

  return {
    producer,
    operation,
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  goToOperation: () => dispatch(goToOperation(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('producer'),
  flattenProp('operation'),
  setDisplayName('Operation'),
)

const Operation = enhancer(({ name, deliveryDate, goToOperation }) => (
  <View
    style={styles.wrapper}
  >
    <TouchableRipple
      onPress={goToOperation}
    >
      <View
        style={styles.container}
      >
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.date}>
          &nbsp;({moment(deliveryDate).format('MMMM YYYY')})
        </Text>
        <SimpleLineIcons name="arrow-right" size={20}/>
      </View>
    </TouchableRipple>
  </View>
))

export default Operation
