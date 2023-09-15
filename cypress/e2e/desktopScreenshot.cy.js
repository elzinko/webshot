describe('The API', () => {
  it('returns desktop screenshot', () => {
    cy.request('http://localhost:3000/api/github.fr').should((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('image/png')
    })
  })
})