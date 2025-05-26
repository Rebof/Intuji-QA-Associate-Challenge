/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

let user;

beforeEach(() => {
  cy.clearCookies();
  cy.clearAllLocalStorage();
  cy.visit("/");

  cy.url().should("include", "automationexercise");
  cy.title().should("eq", "Automation Exercise");

  // Generate random user for each test
  user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: "United States",
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile_number: faker.phone.number("##########"),
  };
});

// afterEach(() => {
//   cy.visit("/");
//   cy.get("body").then(($body) => {
//     if ($body.find("a[href='/logout']").length) {
//       cy.get("a[href='/logout']").click();
//     }
//     cy.url().should("include", "https://www.automationexercise.com/");
//   });
// });

describe("User Registration and Session Handling", () => {
  it("should register a user, verify login, and persist session", () => {
    // Register and session
    cy.session(user.email, () => {
      cy.visit("/");
      cy.registerUser(user);
    });

    // Reuse the session
    cy.visit("/");
    cy.get("li:nth-child(10) a:nth-child(1)").should(
      "contain",
      `Logged in as ${user.name}`
    );

    // delete
    cy.deleteAccount();
  });

  it("Login, logout, then login again and verify session", () => {
  cy.createUserWithApi(user).then(() => {
    // First login
    cy.login(user.email, user.password);

    cy.get("li:nth-child(10) a:nth-child(1)").should(
      "contain",
      `Logged in as ${user.name}`
    );

    cy.logout();

    //logg out assertion
    cy.url().should("include", "/");
    cy.get("a[href='/login']").should("be.visible");

    cy.login(user.email, user.password);

    // Verify second login
    cy.get("li:nth-child(10) a:nth-child(1)").should(
      "contain",
      `Logged in as ${user.name}`
    );

    cy.deleteAccount();
  });
});


it("register with existing email (via API, then UI attempt)", () => {
  cy.fixture("userInfo").then((user) => {
    // Create user using API
    cy.createUserWithApi(user).then(() => {
      cy.log(`User created via API with email: ${user.email}`);

      // Try registering again
      cy.visit("/");
      cy.get("a[href='/login']").click();
      cy.get(".signup-form > h2").should("contain", "New User Signup!");
      cy.get("input[placeholder='Name']").type(user.name);
      cy.get("input[data-qa='signup-email']").type(`${user.email}{enter}`);

      // email error assert
      cy.get(".signup-form > form > p")
        .should("contain", "Email Address already exist!")
        .and("be.visible");
    });
  });
});

  it("Login with valid email but incorrect pw", () => {
    cy.fixture("userInfo").then((userData) => {
      cy.createUserWithApi(user).then(() => {
        cy.log(`Email used for login: ${userData.email}`);

        cy.get("a[href='/login']").click();
        cy.get(".login-form > h2").should("contain", "Login to your account");

        cy.get("input[data-qa='login-email']").type(user.email);
        cy.get("input[placeholder='Password']").type("wrongpassword123");
        cy.get("button[data-qa='login-button']").click();

        cy.get(".login-form > form > p")
          .should("contain", "Your email or password is incorrect!")
          .and("be.visible");
      });
    });
  });

});