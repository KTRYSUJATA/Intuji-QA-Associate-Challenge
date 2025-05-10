// cypress/e2e/productBrowsing.cy.js

describe('Product Browsing & Filtering - AutomationExercise', () => {

    it('Filters products by Women > Dress and verifies details via View Product link', () => {
      // 1️⃣ Visit Home Page
      cy.visit('https://automationexercise.com');
  
      // 2️⃣ Navigate to Products Page
      cy.contains('a', 'Products').click();
  
      // Confirm Products Page loaded
      cy.url().should('include', '/products');
      cy.contains('All Products').should('be.visible');
  
      // 3️⃣ Filter by Category → Women > Dress
      cy.contains('Women').click();
      cy.contains('Dress').click();
  
      // Confirm that filtered product list loads
      cy.url().should('include', 'category_products/1'); // Category ID 1 = Women > Dress
  
      // 4️⃣ Verify product list contains at least one with keyword "Dress"
      cy.get('.features_items .productinfo p').should('exist'); // Ensure products shown
  
      // Assert number of products > 0 (extra safety)
      cy.get('.features_items .productinfo p').its('length').should('be.greaterThan', 0);
  
      // Check at least one product contains keyword "dress"
      cy.get('.features_items .productinfo p').then($products => {
        const hasDress = $products.toArray().some(el =>
          el.innerText.toLowerCase().includes('dress')
        );
        expect(hasDress, 'At least one product contains "dress"').to.be.true;
      });
  
      cy.log('✅ Product list contains at least one item with keyword "Dress".');
  
      // 5️⃣ Click on "View Product" link of first product
      cy.contains('a', 'View Product').first().click();
  
      // Verify Product Detail Page Info
      cy.get('.product-information').within(() => {
        // Product Name
        cy.get('h2').should('be.visible').and('not.be.empty');
  
        // Product Price
        cy.get('span > span').should('be.visible').and(($price) => {
          const priceText = $price.text();
          expect(priceText).to.match(/Rs\.\s*\d+/); // Matches "Rs. 500" or "Rs.1234"
        });
  
        // Availability
        cy.contains('Availability:').parent().should('contain.text', 'In Stock');
      });
  
      cy.log('✅ Product detail page shows name, price, and availability.');
  
    });
  
  });
  