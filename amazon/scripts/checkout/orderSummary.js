import { cart, removeFromCart, 
  calculateCartQuantity, updateQuantity,
  updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import renderPaymentSummary from './paymentSummary.js';

export default function renderOrderSummary() {
  updateCartQuantity();

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    cartSummaryHTML += `
      <div class="js-cart-item-container-${matchingProduct.id} cart-item-container">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="js-quantity-label-${matchingProduct.id} quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="js-quantity-input js-quantity-input-${matchingProduct.id} quantity-input" data-product-id="${matchingProduct.id}">
              <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
              <span style="color:red" class="js-invalid-quantity-${matchingProduct.id} invalid-quantity">Error</span>
              <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateCartQuantity();
      })
    });

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        cartItemContainer.classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        saveQuantityLink(link);
      });
    });

  document.querySelectorAll(`.js-quantity-input`)
    .forEach((link) => {
      link.addEventListener('keydown', (Event) => {
        if (Event.key === 'Enter')
          saveQuantityLink(link);
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const { productId, deliveryOptionId } = option.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      });
    });  

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
        ? 'checked'
        : '';
      html += `
        <div class="js-delivery-option delivery-option" 
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  function saveQuantityLink(link) {
    const { productId } = link.dataset;
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    const newQuantity = checkValidQuantity(productId);

    // console.log(`${productId}, ${newQuantity}`);
    if (newQuantity) {
      updateQuantity(productId, newQuantity);
      updateCartQuantity();
      document.querySelector(`.js-quantity-label-${productId}`)
        .innerHTML = newQuantity;
      cartItemContainer.classList.remove('is-editing-quantity');
      document.querySelector(`.js-invalid-quantity-${productId}`)
        .classList.add('invalid-quantity');
    } else {
      document.querySelector(`.js-invalid-quantity-${productId}`)
        .classList.remove('invalid-quantity');
    }
  }

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;
  }

  function checkValidQuantity(productId) {
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = (Number)(quantityInput.value);

    if (newQuantity <= 0 || newQuantity > 1000)
      return 0;
    return newQuantity;
  }
}