import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { API_HOST } from './config'

const link = new HttpLink({ uri: `http://${API_HOST}/api` })

export const query = async(query, variables) => {
  const response = await makePromise(execute(link, { query, variables }))

  return response.data
}

export const mutate = query
