// This file used for dev and docs page
import React from 'react'
import { createRoot } from 'react-dom/client'

import TestApp from './src/TestApp'

const container = document.getElementById('app')

if (!container) {
  throw new Error('Unable to find root element with id "app"')
}

const root = createRoot(container)
root.render(<TestApp />)
