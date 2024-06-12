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

type TClearifyInput = null | TClearifyObject | TClearifyArray
type TClearifyArray = Array<TClearifyInput>
type TClearifyObject = {
  [key: string]: TClearifyInput
}
// remove __typename if need, avoid GraphQL error
export const clearfy = (obj: TClearifyInput): TClearifyInput => {
  if (!obj) return null

  if (Array.isArray(obj)) {
    return obj.map(clearfy)
  }

  if (typeof obj === 'object') {
    const newObj: TClearifyObject = {}

    for (const key of Object.keys(obj)) {
      newObj[key] = clearfy(obj[key])
    }

    // 确保 __typename 存在再删除
    if ('__typename' in newObj) {
      delete newObj.__typename
    }
    return newObj
  }

  return obj
}
