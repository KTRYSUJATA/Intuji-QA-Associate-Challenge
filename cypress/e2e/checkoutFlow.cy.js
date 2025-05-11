// cypress/e2e/checkoutFlow.cy.js
import Papa from 'papaparse';
describe('Checkout Flow with Fake Payment - AutomationExercise', () => {
    let randomUser = null;

    before(() => {
        // 1️⃣ Read CSV file and select random user
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
      // 1️⃣ Visit Home Page
      cy.visit('https://automationexercise.com');
  
      // Ensure user is logged in (you can reuse session or log in fresh)
      // Example login flow
      cy.contains('Signup / Login').click();
      cy.get('input[data-qa="login-email"]').type(randomUser.email);
      cy.get('input[data-qa="login-password"]').type(randomUser.password);
      cy.get('button[data-qa="login-button"]').click();
  
      cy.contains('Logged in as').should('be.visible');
  
      // 2️⃣ Add a product to cart to prepare for checkout
      cy.contains('a', 'Products').click();
      cy.contains('a', 'View Product').first().click();
      cy.get('.cart').click(); // Add to cart
      cy.contains('View Cart').click();
  
      // 3️⃣ Proceed to checkout
      cy.contains('Proceed To Checkout').click();
  
      // 4️⃣ Fill address if needed or confirm saved address
      cy.get('#address_delivery').should('be.visible');
      cy.log('✅ Delivery address is displayed.');
  
      // Optionally enter comment for order
      cy.get('textarea[name="message"]').type('Please deliver between 10AM - 5PM.');
  
      // Place Order
      cy.contains('Place Order').click();
  
      // 5️⃣ Enter fake payment details
      cy.get('input[name="name_on_card"]').type('Test User');
      cy.get('input[name="card_number"]').type('4111111111111111'); // Fake Visa test card
      cy.get('input[name="cvc"]').type('123');
      cy.get('input[name="expiry_month"]').type('12');
      cy.get('input[name="expiry_year"]').type('2030');
  
      // Confirm order
      cy.contains('Pay and Confirm Order').click();
  
      // 6️⃣ Validate success message
      cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  
      cy.log('✅ Congratulations! Your order has been confirmed! message displayed.');
  
    });
  
  });
