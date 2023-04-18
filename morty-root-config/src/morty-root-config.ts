import { registerApplication, start } from 'single-spa'
import { QueryClient } from '@tanstack/react-query'

import { importApp } from './helpers/importApp'

let importedApps = []
let shareScope = []

const queryClient = new QueryClient()

// registerApplication({
//   name: '@single-spa/welcome',
//   app: () =>
//     System.import<LifeCycles>(
//       'https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js'
//     ),
//   activeWhen: ['/another'],
// })

registerApplication({
  name: 'home-main',
  app: () => importApp('home/main', shareScope, importedApps),
  activeWhen: location =>
    location.pathname === '/' || location.pathname === '/home',
  customProps: {
    queryClient,
  },
})

registerApplication({
  name: 'character-main',
  app: () => importApp('character/main', shareScope, importedApps),
  activeWhen: ['/character/:characterId'],
})

start({
  urlRerouteOnly: true,
})
