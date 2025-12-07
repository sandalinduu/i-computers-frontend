// src/utils/cart.js
// Simple cart helpers using localStorage

const CART_KEY = "cart_v1";

// return cart array
export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("getCart parse error", e);
    return [];
  }
}

// save cart array
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// add product object to cart
// product should include: productId, name, price, image (string), optionally labelledPrice
export function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex((p) => p.productId === product.productId);
  if (idx >= 0) {
    cart[idx].quantity += qty;
  } else {
    cart.push({
      productId: product.productId,
      name: product.name,
      price: Number(product.price) || 0,
      labelledPrice: product.labelledPrice || null,
      image: product.image || (product.imageUrls ? product.imageUrls[0] : null),
      quantity: qty,
    });
  }
  setCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter((p) => p.productId !== productId);
  setCart(cart);
  return cart;
}

export function updateQuantity(productId, quantity) {
  const cart = getCart();
  const idx = cart.findIndex((p) => p.productId === productId);
  if (idx >= 0) {
    if (quantity <= 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx].quantity = quantity;
    }
    setCart(cart);
  }
  return cart;
}

export function emptyCart() {
  localStorage.removeItem(CART_KEY);
  return [];
}

export function cartCount() {
  const cart = getCart();
  return cart.reduce((s, item) => s + item.quantity, 0);
}

export function cartTotal() {
  const cart = getCart();
  return cart.reduce((s, item) => s + item.price * item.quantity, 0);
}
