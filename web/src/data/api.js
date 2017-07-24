import apollo from './apollo'

export const query = async(query, variables, fetchPolicy = 'network-only') => {
  const response = await apollo.query({ query, variables, fetchPolicy })

  return response.data
}

export const mutate = async(mutation, variables) => {
  const response = await apollo.mutate({ mutation, variables })

  return response.data
}
