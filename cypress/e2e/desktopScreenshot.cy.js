describe('The API', () => {
  it('returns desktop screenshot with device parameter', () => {
    cy.request(`${Cypress.env('host')}/api/github.fr?device=desktop`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('image/png')
    })
  })
})