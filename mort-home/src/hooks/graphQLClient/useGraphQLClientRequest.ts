import { QueryClient } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'

export const useGraphQLClientRequest = () => {
  const graphQLClientRequest = new GraphQLClient(
    'https://rickandmortyapi.com/graphql',
    {}
  )

  const reactQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
      },
    },
  })

  return { graphQLClientRequest, reactQueryClient }
}
