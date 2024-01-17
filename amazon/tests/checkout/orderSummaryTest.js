import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe("test suite: renderOrderSummary", function() {
  const productId1 = "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d";
  const productId2 = "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7";

  beforeEach(function() {
    spyOn(localStorage, "setItem");
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-return-to-home-link"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(function() {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 2,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  it("displays the cart", function() {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 2");
  });

  it("removes a product", function() {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  afterEach(function() {
    document.querySelector('.js-test-container').innerHTML = '';
  });
});