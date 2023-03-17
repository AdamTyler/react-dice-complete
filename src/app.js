// This file used for dev and test
import React from 'react'
import { createRoot } from 'react-dom/client'
import TestApp from './TestApp'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<TestApp />)
