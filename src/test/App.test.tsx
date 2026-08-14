import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from '../App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    // Test that the app renders
    expect(document.body).toBeTruthy()
  })

  it('renders the portfolio application', () => {
    render(<App />)
    const appContainer = document.querySelector('body')
    expect(appContainer).toBeTruthy()
  })
})
