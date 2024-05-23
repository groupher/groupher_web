import { useQuery as useGQQuery } from 'urql'

const useQuery = (query, variables) => {
  const [result] = useGQQuery({
    query,
    variables,
    // requestPolicy: 'cache-and-network',
  })
  const { data, error } = result

  return { data, error }
}

export default useQuery
