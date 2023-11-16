import { calculateCartQuantity } from "../../data/cart.js";

export default function renderCheckoutHeader() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}