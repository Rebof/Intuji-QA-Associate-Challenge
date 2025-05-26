/// <reference types="cypress" />

describe("Product Browsing & Filtering", () => {
  const categoryUrl = "/category_products/1"; // Women > Dress
  const expectedCategoryKeyword = "Dress";
  const productDetailId = 3;
  const searchKeyword = "Blue";
  const expectedSearchResult = "Blue Top";

  beforeEach(() => {
    cy.visit("/products");
  });

  it("Filter by category and verify product detail", () => {
    // Women > Dress
    cy.get("a[href='#Women']").click();
    cy.get(`a[href='${categoryUrl}']`).click();

    //products have Dress in productinfo
    cy.get(".features_items .col-sm-4")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        cy.wrap($el)
          .should("be.visible")
          .find(".productinfo")
          .invoke("text")
          .should("include", expectedCategoryKeyword);
      });

    //name & price for product with ID 3
    let productName, productPrice;

    cy.get(`a[href='/product_details/${productDetailId}']`)
      .parents(".col-sm-4") // get the product container whch shoul hold the info on that prod
      .within(() => {
        cy.get(".productinfo > p")
          .invoke("text")
          .then((text) => {
            productName = text.trim();
          });
        cy.get(".productinfo > h2")
          .invoke("text")
          .then((text) => {
            productPrice = text.trim();
          });
      })
      .then(() => {
        // Click the product 3
        cy.get(`a[href='/product_details/${productDetailId}']`).click();

        cy.url().should("include", `/product_details/${productDetailId}`);

        // Verify product details
        cy.get(".product-information").within(() => {
          cy.get("h2").should("be.visible").and("have.text", productName);
          cy.get(":nth-child(3)")
            .should("be.visible")
            .and("contain", expectedCategoryKeyword);
          cy.get(":nth-child(5) > span")
            .should("be.visible")
            .and("contain", productPrice);
          cy.get(":nth-child(6)").should("be.visible");
          cy.get(":nth-child(7)").should("be.visible");
          cy.get(":nth-child(8)").should("be.visible");
        });
      });
  });

  it("Search for product and verify results", () => {
    cy.get("#search_product").clear().type(searchKeyword);
    cy.get("#submit_search").click();

    cy.get(".productinfo").should("contain", expectedSearchResult);

    cy.get(".features_items .col-sm-4")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        cy.wrap($el)
          .should("be.visible")
          .find(".productinfo")
          .then(($info) => {
            if ($info.text().includes(expectedSearchResult)) {
              cy.log(`Found a product with "${expectedSearchResult}"`);
            }
          });
      });
  });

  // this case will fail as there is a bug in the system
  it("Visit invalid product detail shows error and no product info or add-to-cart elements", () => {
    const invalidProductId = 999999;

    cy.visit(`/product_details/${invalidProductId}`, {
      failOnStatusCode: false,
    });

    // Check product info elements are NOT visible
    cy.get(".product-information").should("not.exist");

    cy.get(".product-information #quantity").should("not.exist");
  });
});
