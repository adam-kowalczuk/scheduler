describe('Appointments', () => {
  beforeEach(() => {
    //Reset database
    cy.request("GET", "/api/debug/reset");
    //Load index.html
    cy.visit("/");
    //Visit "Monday"
    cy.contains("Monday");
  });

  it('should book an interview', () => {
    //Click Add button
    cy.get("[alt=Add]")
      .first()
      .click();
    //Type student name into input
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //Select an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    //Click save button
    cy.contains("Save").click();
    //Check that show component contains correct student and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it('should edit an interview', () => {
    //Click Edit button 
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    //Type student name into input
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    //Select an interviewer
    cy.get("[alt='Tori Malcolm']").click();
    //Click save button
    cy.contains("Save").click();
    //Check that show component contains correct student and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it('should delete an interview', () => {
    //Click Delete button 
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
    //Click Confirm button
    cy.contains("Confirm").click();
    //Confirm Deleting spinner is active
    cy.contains("Deleting").should('exist');
    //Confirm Deleting spinner is not longer active
    cy.contains("Deleting").should('not.exist');
    //Check that appointment has been deleted
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});