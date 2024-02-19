import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import { routerPlugin } from 'kea-router'
import { resetContext } from 'kea'

resetContext({
  plugins: [
    routerPlugin({
      /* options */
    }),
  ],
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
