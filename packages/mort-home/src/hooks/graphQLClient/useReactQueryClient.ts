import { useQueryClient } from '@tanstack/react-query'
import { useGraphQLClientRequest } from './useGraphQLClientRequest'

const useReactQueryClient = () => {
  const { graphQLClientRequest } = useGraphQLClientRequest()
  const reactQueryClient = useQueryClient()

  return { graphQLClientRequest, reactQueryClient }
}

export default useReactQueryClient
