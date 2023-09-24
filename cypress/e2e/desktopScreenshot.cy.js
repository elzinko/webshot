describe('we ask github.fr screenshot', () => {
  it('returns desktop screenshot with device parameter', () => {
    cy.request(`${Cypress.env('host')}/api/webshot?url=https://github.fr`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('image/png')
    })
  })
})