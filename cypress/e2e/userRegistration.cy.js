import { faker } from '@faker-js/faker';

describe('User Registration & Session Handling - AutomationExercise', () => {

  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    country: 'Canada',
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    mobileNumber: faker.phone.number('+1##########')
  };

  before(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Registers a new user with unique email and stores session', () => {
    cy.contains('Signup / Login').click();

    cy.get('input[data-qa="signup-name"]').type(user.name);
    cy.get('input[data-qa="signup-email"]').type(user.email);
    cy.get('button[data-qa="signup-button"]').click();

    // Handle if email already exists
    cy.get('form[action="/signup"]').then(($form) => {
      if ($form.find('.signup-form .text-danger').length > 0) {
        user.email = faker.internet.email();
        cy.get('input[data-qa="signup-name"]').clear().type(user.name);
        cy.get('input[data-qa="signup-email"]').clear().type(user.email);
        cy.get('button[data-qa="signup-button"]').click();
      }
    });

    cy.get('#id_gender1').check();
    cy.get('#password').type(user.password);
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');

    cy.get('#first_name').type(user.firstName);
    cy.get('#last_name').type(user.lastName);
    cy.get('#address1').type(user.address);
    cy.get('#country').select(user.country);
    cy.get('#state').type(user.state);
    cy.get('#city').type(user.city);
    cy.get('#zipcode').type(user.zipCode);
    cy.get('#mobile_number').type(user.mobileNumber);

    cy.get('button[data-qa="create-account"]').click();

    cy.contains('Account Created!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();

    // THIS IS THE CORRECT WAY TO VERIFY LOGIN
    cy.contains('a', `Logged in as ${user.name}`, { timeout: 10000 }).should('be.visible');

    // Save cookies/session
    cy.getCookies().then((cookies) => {
      cookies.forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });
  });

  it('Reuses session and verifies user is still logged in', () => {
    cy.visit('https://automationexercise.com');

    cy.getCookies().then((cookies) => {
      cookies.forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });

    cy.reload(); 

    cy.contains('a', `Logged in as ${user.name}`, { timeout: 10000 }).then($el => {
        if ($el.length > 0 && $el.is(':visible')) {
          cy.log('User is logged in successfully.');
        } else {
          cy.log('User is not logged in — element not visible.');
        }
      });
  });

});
