// cypress/e2e/logoutRelogin.cy.js

describe('Logout and Re-login Flow - AutomationExercise', () => {

    const email = 'Manley24@yahoo.com';
    const password = 'C1GH48MwE15F';
  
    it('Logs out and logs back in, verifying user state', () => {
      // 1️⃣ Visit Home Page
      cy.visit('https://automationexercise.com');
  
      // === Login if not already ===
      cy.contains('Signup / Login').click();
      cy.get('input[data-qa="login-email"]').type(email);
      cy.get('input[data-qa="login-password"]').type(password);
      cy.get('button[data-qa="login-button"]').click();
  
      // Verify login success
      cy.contains('Logged in as').should('be.visible');
      cy.log('✅ Logged in successfully.');
  
      // === Optional: Add item to cart to test persistence ===
      cy.contains('a', 'Products').click();
      cy.contains('a', 'View Product').first().click();
      cy.get('.cart').click(); // Add to cart
      cy.contains('View Cart').click();
  
      // Verify item in cart
      cy.get('.cart_description h4 a').should('exist');
      cy.log('✅ Cart contains items before logout.');
  
      // 2️⃣ Log out
      cy.contains('Logout').click();
      cy.url().should('include', '/login');
      cy.log('✅ Logged out successfully.');
  
      // 3️⃣ Log back in
      cy.get('input[data-qa="login-email"]').type(email);
      cy.get('input[data-qa="login-password"]').type(password);
      cy.get('button[data-qa="login-button"]').click();
  
      // Verify login success again
      cy.contains('Logged in as').should('be.visible');
      cy.log('✅ Logged in again successfully.');
  
      // 4️⃣ Verify user state is preserved (Cart should still have item)
      cy.contains('Cart').click();
      cy.get('.cart_description h4 a').should('exist');
      cy.log('✅ Cart items persisted after logout and re-login.');
  
    });
  
  });