export let cart = [{
  productId: 'a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d',
  quantity: 1
}, {
  productId: 'a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',
  quantity: 2
}];

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
      quantity
    });
}

export function removeFromCart(productId) {
  cart =  cart.filter(cartItem => cartItem.productId !== productId);
}