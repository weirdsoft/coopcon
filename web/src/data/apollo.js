import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const link = new HttpLink({ uri: '/api' })
const cache = new InMemoryCache()
const client = new ApolloClient({
  link,
  cache,
})

export default client
