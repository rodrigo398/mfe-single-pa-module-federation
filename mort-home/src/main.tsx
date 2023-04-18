import ReactDOM from 'react-dom/client'
import { QueryClient } from '@tanstack/react-query'

import AppRemote from './AppRemote'

const reactQueryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppRemote queryClient={reactQueryClient} />
)
