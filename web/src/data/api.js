import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

const link = new HttpLink({ uri: '/api' })

export const query = async(query, variables) => {
  const response = await makePromise(execute(link, { query, variables }))

  return response.data
}

export const mutate = query
