import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, flattenProp, branch, renderNothing, setDisplayName } from 'recompose'
import {
  toggleFilterOperationOrdersBySearch, changeFilterOperationOrdersBySearch,
} from 'Coopcon/data/operation-order/actions'
import { getOperationOrdersFilter } from 'Coopcon/data/operation-order/selectors'
import { StyleSheet, View } from 'react-native'
import SearchBar from 'react-native-searchbar'

const styles = StyleSheet.create({
  container: {
    height: 65,
  },
})

const mapStateToProps = (state) => ({
  filters: getOperationOrdersFilter(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleSearch: () => dispatch(toggleFilterOperationOrdersBySearch()),
  changeSearch: (text) => dispatch(changeFilterOperationOrdersBySearch(text)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('filters'),
  branch(
    R.compose(R.isNil, R.prop('searchTerm')),
    renderNothing,
  ),
  setDisplayName('Search'),
)

const Search = enhancer(({ toggleSearch, changeSearch }) => (
  <View style={styles.container}>
    <SearchBar
      placeholder="Buscar..."
      showOnLoad={true}
      handleChangeText={changeSearch}
      onX={() => changeSearch('')}
      onBack={toggleSearch}
    />
  </View>
))

export default Search
