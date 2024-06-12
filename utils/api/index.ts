//
import gqClient from './gq_client'

export const query = (query, variables) => {
  return gqClient
    .query(query, variables)
    .toPromise()
    .then((res) => {
      if (res.error) throw res.error
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const mutate = (mutation, variables) => {
  return gqClient
    .mutation(mutation, variables)
    .toPromise()
    .then((res) => {
      if (res.error) throw res.error
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

// remove __typename from query params, otherwise the Graphql will throw error
export const clearfy = (obj: any): any => {
  const result = obj

  if (Array.isArray(result)) {
    return result.map(clearfy)
  }

  if (result && typeof result === 'object') {
    const newObj = { ...result }
    for (const key of Object.keys(newObj)) {
      newObj[key] = clearfy(newObj[key]) //
    }
    // delete Graphql typename if need, otherwise it will cause gq type error
    delete newObj.__typename
    return newObj
  }

  return result
}
