import { useGetCharacterQuery } from '../../generated/graphql'

import useReactQueryClient from '../graphQLClient/useReactQueryClient'

export const useGetCharacter = () => {
  const { graphQLClientRequest } = useReactQueryClient()

  const { data, isLoading, isError } = useGetCharacterQuery(
    graphQLClientRequest,
    {},
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      enabled: true,
      cacheTime: 0,
      staleTime: 60000,
    }
  )

  return { characters: data?.characters?.results, isLoading, isError }
}
