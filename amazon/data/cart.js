export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d',
  quantity: 1,
  deliveryOptionId: '1'
}, {
  productId: 'a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',
  quantity: 2,
  deliveryOptionId: '2'
}];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId)
      matchingItem = cartItem;
  });
  if (matchingItem)
    matchingItem.quantity += quantity;
  else 
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });

  saveToStorage();
}

export function removeFromCart(productId) {
  cart =  cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart = cart.map(cartItem => {
    if (cartItem.productId === productId)
      cartItem.quantity = newQuantity;
    return cartItem;
  });

  // const newArray = [];
  // for (let i = 0; i < cart.length; i++) {
  //   if (cart[i].productId === productId)
  //     cart[i].quantity = newQuantity;
  //   newArray.push(cart[i]);
  // }
  // cart = newArray;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId)
      matchingItem = cartItem;
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}