import { execute, makePromise } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { API_HOST } from './config'

const link = new BatchHttpLink({ uri: `http://${API_HOST}/api` })

export const query = async(query, variables) => {
  const response = await makePromise(execute(link, { query, variables }))

  return response.data
}

export const mutate = query
