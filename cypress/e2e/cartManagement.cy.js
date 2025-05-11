// cypress/e2e/cartManagement.cy.js

describe('Cart and Quantity Management - AutomationExercise', () => {

    it('Adds items to cart, updates quantity, verifies totals, and removes item', () => {
      // 1️⃣ Visit Home Page
      cy.visit('https://automationexercise.com');
  
      // 2️⃣ Navigate to Products Page
      cy.contains('a', 'Products').click();
      cy.url().should('include', '/products');
  
      // === Add first product from "Women > Dress" ===
      cy.contains('Women').click();
      cy.contains('Dress').click();
      cy.contains('a', 'View Product').first().click();
  
      cy.get('.product-information h2').invoke('text').as('firstProductName');
  
      // Set quantity to 3 before adding to cart
      cy.get('input[name="quantity"]').clear().type('3');
      cy.get('.cart').click(); // Add to cart
      cy.contains('View Cart').click();
  
      // === Return to Products Page ===
      cy.contains('a', 'Products').click();
  
      // === Add second product from "Men > Tshirts" ===
      cy.contains('Men').click();
      cy.contains('Tshirts').click();
      cy.contains('a', 'View Product').first().click();
  
      cy.get('.product-information h2').invoke('text').as('secondProductName');
  
      cy.get('.cart').click(); // Add to cart (default qty = 1)
      cy.contains('View Cart').click();
  
      // Verify both products are in cart
      cy.get('@firstProductName').then(firstName => {
        cy.get('tr').should('contain.text', firstName.trim());
      });
      cy.get('@secondProductName').then(secondName => {
        cy.get('tr').should('contain.text', secondName.trim());
      });
  
      cy.log('✅ Both products added to cart successfully.');
  
      // === 3️⃣ Verify quantity of first item is 3 ===
      cy.get('tr').eq(1).within(() => {
        cy.get('.cart_quantity button.disabled').should('have.text', '3');
      });
  
      // === 4️⃣ Verify cart total calculation ===
      cy.get('tr').eq(1).within(() => {
        cy.get('.cart_price').invoke('text').then(priceText => {
          const unitPrice = parseInt(priceText.replace(/[^\d]/g, ''));
          const quantity = 3;
          const expectedTotal = unitPrice * quantity;
  
          cy.get('.cart_total_price').invoke('text').then(totalText => {
            const actualTotal = parseInt(totalText.replace(/[^\d]/g, ''));
            expect(actualTotal).to.eq(expectedTotal);
          });
        });
      });
  
      cy.log('✅ Cart quantity and total verified.');
  
      // === 5️⃣ Remove second product ===
      cy.get('tr').eq(2).within(() => {
        cy.get('.cart_delete a').click();
      });
  
      // Verify second product is removed
      // Verify second product row no longer exists (cleaner and faster!)
    cy.get('tr').should('have.length', 2);  // 1 header row + 1 product row

    cy.log('✅ Second product removed from cart successfully.');
  
    });
  
  });
  