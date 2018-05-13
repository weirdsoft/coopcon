import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { getOperationOrdersFilter } from 'Coopcon/data/operation-order/selectors'
import {
  toggleFilterOperationOrdersByNotPaid, toggleFilterOperationOrdersBySearch,
} from 'Coopcon/data/operation-order/actions'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  action: {
    paddingHorizontal: 10,
  },
})

const mapStateToProps = (state) => ({
  filter: getOperationOrdersFilter(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleNotPaidFilter: () => dispatch(toggleFilterOperationOrdersByNotPaid()),
  toggleSearch: () => dispatch(toggleFilterOperationOrdersBySearch()),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('filter'),
  setDisplayName('Filters'),
)

const Filters = enhance(({ unpaid, searchTerm, toggleNotPaidFilter, toggleSearch }) => (
  <View style={styles.container}>
    <TouchableRipple
      borderless={true}
      style={styles.action}
      onPress={toggleNotPaidFilter}
    >
      <MaterialIcons name="money-off" size={22} color={unpaid ? 'white' : 'darkgray'} />
    </TouchableRipple>
    <TouchableRipple
      borderless={true}
      style={styles.action}
      onPress={toggleSearch}
    >
      <MaterialIcons name="search" size={25} color={R.isNil(searchTerm) ? 'darkgray' : 'white' } />
    </TouchableRipple>
  </View>
))

export default Filters
