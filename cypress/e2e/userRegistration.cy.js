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
    cy.log(`Generated user email: ${user.email}`);
    cy.log(`Generated user password: ${user.password}`);
    cy.get('button[data-qa="create-account"]').click();

    cy.contains('Account Created!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();

    cy.contains('a', `Logged in as ${user.name}`, { timeout: 10000 }).should('be.visible');

    cy.getCookies().then((cookies) => {
      cookies.forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });

    const csvLine = `"${user.email}","${user.password}"\n`;

    cy.writeFile('cypress/fixtures/registeredUsers.csv', 'email,password\n', { flag: 'w' });
    cy.writeFile('cypress/fixtures/registeredUsers.csv', csvLine, { flag: 'a+' });         

    cy.log('User credentials saved to cypress/fixtures/registeredUsers.csv');

  });

  it('Reuses session and verifies user is still logged in', () => {
    cy.visit('https://automationexercise.com');

    cy.getCookies().then((cookies) => {
      cookies.forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });

    cy.reload(); 
    cy.wait(2000);
    cy.contains('a', `Logged in as ${user.name}`, { timeout: 10000 }).should('be.visible');
    
    cy.log('User session reused and verified.');

  });

});
