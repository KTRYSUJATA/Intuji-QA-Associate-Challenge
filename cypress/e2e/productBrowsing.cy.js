
describe('Product Browsing & Filtering - AutomationExercise', () => {

    it('Filters products by Women > Dress and verifies details via View Product link', () => {
      cy.visit('https://automationexercise.com');
      cy.contains('a', 'Products').click();
      cy.url().should('include', '/products');
      cy.contains('All Products').should('be.visible');
      cy.contains('Women').click();
      cy.contains('Dress').click();
      cy.url().should('include', 'category_products/1');
      cy.get('.features_items .productinfo p').should('exist'); 

      cy.get('.features_items .productinfo p').its('length').should('be.greaterThan', 0);

      cy.get('.features_items .productinfo p').then($products => {
        const hasDress = $products.toArray().some(el =>
          el.innerText.toLowerCase().includes('dress')
        );
        expect(hasDress, 'At least one product contains "dress"').to.be.true;
      });
  
      cy.log('Product list contains at least one item with keyword "Dress".');
  
      cy.contains('a', 'View Product').first().click();
      cy.get('.product-information').within(() => {
        cy.get('h2').should('be.visible').and('not.be.empty');
        cy.get('span > span').should('be.visible').and(($price) => {
          const priceText = $price.text();
          expect(priceText).to.match(/Rs\.\s*\d+/); // Matches "Rs. 500" or "Rs.1234"
        });
        cy.contains('Availability:').parent().should('contain.text', 'In Stock');
      });
  
      cy.log('Product detail page shows name, price, and availability.');
  
    });
  
  });
  