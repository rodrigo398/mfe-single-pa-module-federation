import { useGetAllCharactersQuery } from '../../generated/graphql'

import useReactQueryClient from '../graphQLClient/useReactQueryClient'

export const useGetAllCharacters = () => {
  const { graphQLClientRequest } = useReactQueryClient()

  const { data, isLoading, isError } = useGetAllCharactersQuery(
    graphQLClientRequest,
    {},
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      enabled: true,
      cacheTime: 300000,
      staleTime: 60000,
    }
  )

  return { characters: data?.characters?.results, isLoading, isError }
}
