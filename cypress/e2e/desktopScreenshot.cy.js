describe('The API', () => {
  it('returns desktop screenshot', () => {
    cy.request(`${Cypress.env('host')}/api/github.fr`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('image/png')
    })
  })
  it('returns desktop screenshot', () => {
    cy.request(`${Cypress.env('host')}/api/github.fr?device=desktop`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('image/png')
    })
  })
})