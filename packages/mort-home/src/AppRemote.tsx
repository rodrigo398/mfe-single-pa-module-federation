import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App'

interface AppRemoteProps {
  queryClient: QueryClient
}

const AppRemote: React.FC<AppRemoteProps> = ({
  queryClient: reactQueryClient,
}) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default AppRemote
