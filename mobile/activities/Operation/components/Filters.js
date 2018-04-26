import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { getOperationOrdersFilter } from 'Coopcon/data/operation-order/selectors'
import { toggleFilterOperationOrdersByNotPaid } from 'Coopcon/data/operation-order/actions'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
})

const mapStateToProps = (state) => ({
  filter: getOperationOrdersFilter(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleNotPaidFilter: () => dispatch(toggleFilterOperationOrdersByNotPaid()),
})
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('filter'),
  setDisplayName('Filters'),
)

const Filters = enhance(({ unpaid, toggleNotPaidFilter }) => (
  <View style={styles.container}>
    <TouchableRipple
      borderless={true}
      onPress={toggleNotPaidFilter}
    >
      <MaterialIcons name="money-off" size={22} color={unpaid ? 'white' : 'darkgray'}/>
    </TouchableRipple>
  </View>
))

export default Filters
