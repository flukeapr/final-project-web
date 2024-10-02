import React from 'react'
import HeroSection from './HeroSection'

describe('<HeroSection />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HeroSection />)
  })
})