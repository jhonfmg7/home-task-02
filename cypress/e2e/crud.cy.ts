describe('proving CRUD functionalities for movies app', () => {
  it('proving the URL have the correct queries', () => {
    cy.visit('http://localhost:3000/');

    cy.url()
      .should('contain', '/search')
      .should('contain', 'genre')
      .should('contain', 'sortBy')
  });

  it('create new movie', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy=movies_quantity_number]')
      .should('exist')
      .invoke('text')
      .should('equal', '3000')

    cy.get('[data-cy=new_movie_input_title]')
      .should('not.exist')

    cy.get('[data-cy=add_movie_button]')
      .click();

    // Error Validation => not exists
    cy.get('[data-cy=new_movie_error]')
      .should('not.exist')

    cy.get('[data-cy=new_movie_submit_button]')
      .should('exist')
      .click()
  
    // Error Validation => exists
    cy.get('[data-cy=new_movie_error]')
      .should('exist')

    cy.get('[data-cy=new_movie_input_title]')
      .should('exist')
      .type('testing title')

    cy.get('[data-cy=new_movie_input_release_date]')
      .should('exist')
      .type('2022-10-10')

    cy.get('[data-cy=new_movie_input_poster_path]')
      .should('exist')
      .type('https://image.tmdb.org/t/p/w500/ldoY4fTZkGISMidNw60GHoNdgP8.jpg')

    cy.get('[data-cy=new_movie_input_vote_average]')
      .should('exist')
      .type('7')

    cy.get('[data-cy=new_movie_input_genres]')
      .should('exist')
      .select('all')

    cy.get('[data-cy=new_movie_input_runtime]')
      .should('exist')
      .type('100')

    cy.get('[data-cy=new_movie_input_overview]')
      .should('exist')
      .type('Brief description')

    // Notification Element => not exist
    cy.get('[data-cy=notification_element]')
      .should('not.exist')

    cy.get('[data-cy=new_movie_submit_button]')
      .should('exist')
      .click()

    // Notification Element => exist
    cy.get('[data-cy=notification_element]')
      .should('exist')

    cy.get('[data-cy=notification_message]')
      .should('exist')
      .invoke('text')
      .should('equal', 'The movie was created successfully')

    cy.get('[data-cy=movies_quantity_number]')
      .should('exist')
      .invoke('text')
      .should('equal', '3001')
  });

  it('delete a movie', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy=movies_quantity_number]')
      .should('exist')
      .invoke('text')
      .should('equal', '3001')
      
    cy.get('[data-cy=card_movie_title]')
      .first()
      .invoke('text')
      .should('equal', 'testing title')

    cy.get('[data-cy=movie_menu_button]')
      .first()
      .should('exist')
      .click({ force: true });

    cy.get('[data-cy=delete_modal_confirm_button]')
      .should('not.exist')

    cy.get('[data-cy=delete_modal_button]')
      .should('exist')
      .click()
    
      // Notification Element => not exist
    cy.get('[data-cy=notification_element]')
      .should('not.exist')
    
    cy.get('[data-cy=delete_modal_confirm_button]')
      .should('exist')
      .click()

    // Notification Element => exist
    cy.get('[data-cy=notification_element]')
      .should('exist')

    cy.get('[data-cy=notification_message]')
      .should('exist')
      .invoke('text')
      .should('equal', 'The movie was deleted successfully')

    cy.get('[data-cy=movies_quantity_number]')
      .should('exist')
      .invoke('text')
      .should('equal', '3000')
  });

})