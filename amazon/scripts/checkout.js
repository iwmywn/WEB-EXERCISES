import { cart, removeFromCart, 
  calculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

updateCartQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId =  cartItem.productId
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) 
      matchingProduct = product;
  });
  cartSummaryHTML += `
    <div class="js-cart-item-container-${productId} cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
              Quantity: <span class="js-quantity-label-${productId} quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${productId}">
              Update
            </span>
            <input class="js-quantity-input js-quantity-input-${productId} quantity-input" data-product-id="${productId}">
            <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${productId}">Save</span>
            <span style="color:red" class="js-invalid-quantity-${productId} invalid-quantity">Error</span>
            <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
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