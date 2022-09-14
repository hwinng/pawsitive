import { render, screen } from '@testing-library/react'
import React from 'react'

import App from './App'

test('it should render App component', () => {
  render(<App />)

  expect(screen.getByTestId('App')).toBeInTheDocument()
})
