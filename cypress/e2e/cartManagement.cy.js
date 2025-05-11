
describe('Cart and Quantity Management - AutomationExercise', () => {

    it('Adds items to cart, updates quantity, verifies totals, and removes item', () => {
      cy.visit('https://automationexercise.com');
      cy.contains('a', 'Products').click();
      cy.url().should('include', '/products');
  
      cy.contains('Women').click();
      cy.contains('Dress').click();
      cy.contains('a', 'View Product').first().click();
  
      cy.get('.product-information h2').invoke('text').as('firstProductName');
  

      cy.get('input[name="quantity"]').clear().type('3');
      cy.get('.cart').click();
      cy.contains('View Cart').click();
  
      cy.contains('a', 'Products').click();
  
      cy.contains('Men').click();
      cy.contains('Tshirts').click();
      cy.contains('a', 'View Product').first().click();
  
      cy.get('.product-information h2').invoke('text').as('secondProductName');
  
      cy.get('.cart').click(); 
      cy.contains('View Cart').click();
      cy.get('@firstProductName').then(firstName => {
        cy.get('tr').should('contain.text', firstName.trim());
      });
      cy.get('@secondProductName').then(secondName => {
        cy.get('tr').should('contain.text', secondName.trim());
      });
  
      cy.log(' Both products added to cart successfully.');
  
      cy.get('tr').eq(1).within(() => {
        cy.get('.cart_quantity button.disabled').should('have.text', '3');
      });

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
  
      cy.log('Cart quantity and total verified.');
  
      cy.get('tr').eq(2).within(() => {
        cy.get('.cart_delete a').click();
      });
    cy.get('tr').should('have.length', 2); 

    cy.log('Second product removed from cart successfully.');
  
    });
  
  });
  