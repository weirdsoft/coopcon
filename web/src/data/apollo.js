import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({ uri: '/api' })
const client = new ApolloClient({ networkInterface })

export default client
