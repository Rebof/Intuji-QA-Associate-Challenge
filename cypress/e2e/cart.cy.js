/// <reference types="cypress" />

describe("Cart Handling", () => {
  before(() => {
    cy.clearCookies(); // Runs once before all tests
  });

  const product1 = 1;
  const product3 = 3;

  it("Add multiple items to cart from different categories", () => {
    cy.addProductToCart(product1, 1);
    cy.addProductToCart(product3, 1);

    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

    cy.get(`#product-${product1}`).should("exist");
    cy.get(`#product-${product3}`).should("exist");
  });

  it("Change quantity of product 3 to 3 and verify it", () => {
    const productId = product3;
    const newQuantity = 2;

    cy.visit(`/product_details/${productId}`);
    cy.get("#quantity").clear().type(newQuantity);
    cy.get("button[type='button']").click();
    cy.get(".modal-footer > .btn").click();

    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

    cy.get(`#product-${productId} .cart_quantity`).should("contain", newQuantity+1);
  });

  it("Verify cart total calculation is correct", () => {
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

    cy.get(`#product-${product1} .cart_price p`).invoke("text").then(text => {
      const price1 = parseFloat(text.replace(/[^0-9.]/g, ""));
      cy.get(`#product-${product1} .cart_total .cart_total_price`).invoke("text").then(totalText => {
        const total1 = parseFloat(totalText.replace(/[^0-9.]/g, ""));
        expect(total1).to.be.closeTo(price1 * 1, 0.01);
      });
    });

    cy.get(`#product-${product3} .cart_price p`).invoke("text").then(text => {
      const price3 = parseFloat(text.replace(/[^0-9.]/g, ""));
      cy.get(`#product-${product3} .cart_total .cart_total_price`).invoke("text").then(totalText => {
        const total3 = parseFloat(totalText.replace(/[^0-9.]/g, ""));
        expect(total3).to.be.closeTo(price3 * 3, 0.01);
      });
    });
  });

  it("Remove one product and verify cart updates", () => {
    const productToRemove = product1;
    const productToRemain = product3;

    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();

    cy.removeProductFromCart(productToRemove);

    cy.get(`#product-${productToRemove}`).should("not.exist");
    cy.get(`#product-${productToRemain}`).should("exist");
  });
});
