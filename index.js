// This file used for docs page
import TestApp from './src/TestApp'
import React from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<TestApp />)
