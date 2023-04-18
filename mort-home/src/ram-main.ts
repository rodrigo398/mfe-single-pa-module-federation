import React from 'react'
import ReactDOM from 'react-dom/client'
import singleSpaReact from 'single-spa-react'

import AppRemote from './AppRemote'
import ErrorBoundary from './components/dataDisplay/ErrorBoundary'

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: AppRemote,
  errorBoundary: (err, info, props) => {
    console.log('====================================')
    console.error(err)
    console.log(info)
    console.log(props)
    console.log('====================================')

    return ErrorBoundary()
  },
})

export const { bootstrap, mount, unmount } = lifecycles
