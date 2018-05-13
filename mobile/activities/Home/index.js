import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, mapProps, setDisplayName } from 'recompose'
import { fetchOperations } from 'Coopcon/data/operation/actions'
import {
  isLoadingOperations, getOperationIdsByStatus, OPERATION_STATUS,
} from 'Coopcon/data/operation/selectors'
import { StyleSheet, View, SectionList } from 'react-native'
import { Paper, Text, Divider } from 'react-native-paper'
import Operation from './components/Operation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 5,
  },
  headerText: {
    fontWeight: 'bold',
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  emptyText: {
    fontStyle: 'italic',
    color: 'gray',
  },
})

const mapStateToProps = (state) => ({
  loading: isLoadingOperations(state),
  operations: getOperationIdsByStatus(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchOperations: () => dispatch(fetchOperations()),
})

const mapStatusToTitle = {
  [OPERATION_STATUS.STARTED]: 'En curso',
  [OPERATION_STATUS.IN_DELIVERY]: 'Por entregar',
  [OPERATION_STATUS.FINISHED]: 'Finalizado',
}

const mapStatusToEmptyMessage = {
  [OPERATION_STATUS.STARTED]: 'No hay operaciones en curso',
  [OPERATION_STATUS.IN_DELIVERY]: 'No hay operaciones por entregar',
  [OPERATION_STATUS.FINISHED]: 'No hay operaciones finalizadas',
}

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(R.evolve({
    operations: R.compose(
      R.map(([ status, items ]) => ({
        title: mapStatusToTitle[status],
        emptyMessage: mapStatusToEmptyMessage[status],
        data: items,
      })),
      R.toPairs,
    ),
  })),
  setDisplayName('Home'),
)

const Home = enhancer(({ loading, operations, fetchOperations }) => (
  <View style={styles.container}>
    <SectionList
      onRefresh={fetchOperations}
      refreshing={loading}
      sections={operations}
      renderSectionHeader={({ section: { title } }) => (
        <Paper style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </Paper>
      )}
      renderSectionFooter={R.ifElse(
        R.compose(R.isEmpty, R.path([ 'section', 'data' ])),
        ({ section: { emptyMessage } }) => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              {emptyMessage}
            </Text>
          </View>
        ),
        R.always(null),
      )}
      SectionSeparatorComponent={Divider}
      keyExtractor={R.identity}
      renderItem={({ item }) => (<Operation id={item} />)}
      ItemSeparatorComponent={Divider}
    />
  </View>
))

export default class HomeWrapper extends Component {
  render() {
    return <Home/>
  }
}

HomeWrapper.navigationOptions = {
  title: 'Cooperativa de Consumo',
}
