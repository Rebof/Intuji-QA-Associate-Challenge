/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

let user;
let userEmail;

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.visit("/");

  cy.fixture("userInfo").then((userData) => {
    user = userData;
    userEmail = faker.internet.email();
    user.email = userEmail;
  });
});

describe("Order Checkout Test Cases", () => {

  it("Checkout then register", () => {
    cy.addProductToCart(1, 1);    // Assuming this adds a product to cart (adjust id & qty if needed)
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

    cy.get(".btn.btn-default.check_out").click(); // Proceed to pay

    cy.get(".modal-body > :nth-child(2) > a > u").click(); // Click the register link in modal

    cy.registerUser(user); // Custom command to register user

    cy.get(".shop-menu > .nav > :nth-child(3) > a").click(); // Go to cart
    cy.get(".btn.btn-default.check_out").click(); // Checkout again

    cy.verifyAddress("#address_delivery", user); // Verify delivery address

    cy.get(".form-control").type("GOOD PRODUCT"); // Add comment
    cy.get(":nth-child(7) > .btn").click(); // Place the order

    cy.url().should("include", "/payment");

    cy.enterPaymentDetails(); // Custom command for payment inputs

    cy.get('[data-qa="order-placed"] > b').should("be.visible"); // Confirm order placed

    cy.get('[data-qa="continue-button"]').click();

    cy.deleteAccount(); // Clean up user
  });

  it("Register then checkout", () => {
    cy.get("a[href='/login']").click();
    cy.get(".signup-form > h2").should("contain", "New User Signup!");

    cy.registerUser(user);

    cy.addProductToCart(1, 1);
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

    cy.get(".btn.btn-default.check_out").click();

    cy.verifyAddress("#address_delivery", user);

    cy.get(".form-control").type("GOOD PRODUCT");
    cy.get(":nth-child(7) > .btn").click();

    cy.url().should("include", "/payment");

    cy.enterPaymentDetails();

    cy.get('[data-qa="order-placed"] > b').should("be.visible");

    cy.get('[data-qa="continue-button"]').click();

    cy.deleteAccount();
  });

  it("Login then checkout", () => {
    cy.createUserWithApi(user).then(() => {
      cy.log(`Email used for login: ${user.email}`);

      cy.get("a[href='/login']").click();
      cy.get(".login-form > h2").should("contain", "Login to your account");

      cy.get("input[data-qa='login-email']").type(user.email);
      cy.get("input[placeholder='Password']").type(user.password);
      cy.get("button[data-qa='login-button']").click();

      cy.get("li:nth-child(10) a:nth-child(1)").should(
        "contain",
        `Logged in as ${user.name}`
      );

      cy.addProductToCart(1, 1);
      cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

      cy.get(".btn.btn-default.check_out").click();

      cy.verifyAddress("#address_delivery", user);

      cy.get(".form-control").type("GOOD PRODUCT");
      cy.get(":nth-child(7) > .btn").click();

      cy.url().should("include", "/payment");

      cy.enterPaymentDetails();

      cy.get('[data-qa="order-placed"] > b').should("be.visible");

      cy.get('[data-qa="continue-button"]').click();

      cy.deleteAccount();
    });
  });

});
