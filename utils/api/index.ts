//
import gqClient from './gq_client'

export const mutate = (mutation, variables) => {
  return gqClient
    .mutation(mutation, variables)
    .toPromise()
    .then((res) => {
      if (res.error) return res.error
      return res.data
    })
    .catch((e) => e)
}
