describe('proving CRUD functionalities for movies app', () => {
  it('proving the URL have the correct queries', () => {
    cy.visit('http://localhost:3000/');

    cy.url()
      .should('contain', '/search')
    cy.url()
      .should('contain', 'genre')
    cy.url()
      .should('contain', 'sortBy')
  })
  it('create new movie', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy=add_movie_button]')
      .click();
  });
  // it('edit new movie', () => {
  //   cy.visit('http://localhost:3000/');

  // });
  // it('delete new movie', () => {
  //   cy.visit('http://localhost:3000/');

  // });

})