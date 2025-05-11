
import Papa from 'papaparse';
describe('Checkout Flow with Fake Payment - AutomationExercise', () => {
    let randomUser = null;

    before(() => {
        cy.readFile('cypress/fixtures/registeredUsers.csv').then((csvContent) => {
        const parsed = Papa.parse(csvContent, {
            header: true,
            skipEmptyLines: true
        });

        const users = parsed.data;
        const randomIndex = Math.floor(Math.random() * users.length);
        randomUser = users[randomIndex];

        cy.log(`Using random user: ${randomUser.email}`);
        });
    });
    it('Proceeds to checkout, enters fake payment, and verifies confirmation', () => {
      cy.visit('https://automationexercise.com');

      cy.contains('Signup / Login').click();
      cy.get('input[data-qa="login-email"]').type(randomUser.email);
      cy.get('input[data-qa="login-password"]').type(randomUser.password);
      cy.get('button[data-qa="login-button"]').click();
  
      cy.contains('Logged in as').should('be.visible');
  
      cy.contains('a', 'Products').click();
      cy.contains('a', 'View Product').first().click();
      cy.get('.cart').click(); 
      cy.contains('View Cart').click();
  
      cy.contains('Proceed To Checkout').click();
  
      cy.get('#address_delivery').should('be.visible');
      cy.log('Delivery address is displayed.');
  
      cy.get('textarea[name="message"]').type('Please deliver between 10AM - 5PM.');

      cy.contains('Place Order').click();
  
      cy.get('input[name="name_on_card"]').type('Test User');
      cy.get('input[name="card_number"]').type('4111111111111111'); 
      cy.get('input[name="cvc"]').type('123');
      cy.get('input[name="expiry_month"]').type('12');
      cy.get('input[name="expiry_year"]').type('2030');
  
      cy.contains('Pay and Confirm Order').click();
      cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  
      cy.log('Congratulations! Your order has been confirmed! message displayed.');
  
    });
  
  });
