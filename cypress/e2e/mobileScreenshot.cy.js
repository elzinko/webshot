describe('we ask github.fr mobile screenshot', () => {
  it('returns mobile screenshot', () => {
    cy.request(`${Cypress.env('host')}/api/webshot?url=https://github.fr`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('image/png')
    })
  })
})

describe('we ask github.fr mobile screenshot of productivity part', () => {
  it('returns mobile screenshot of this specific part', () => {
    cy.request(`${Cypress.env('host')}/api/webshot?url=https://github.fr&selectorId=productivity`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('image/png')
    })
  })
})