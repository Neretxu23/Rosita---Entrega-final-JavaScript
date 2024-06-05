const addToCartButtons = document.querySelectorAll('#products .add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.id;
        const productPrice = button.dataset.price;

        addProductToCart(productId, productPrice);
    });
});

function addProductToCart(productId, productPrice) {
    const cartContent = document.querySelector('.cart-content');
    const cartItem = createCartItem(productId, productPrice);

    cartContent.appendChild(cartItem);
    updateCartTotal();
}

function createCartItem(productId, productPrice) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.productId = productId;

    const productDetails = document.createElement('div');
    productDetails.classList.add('product-details');
    cartItem.appendChild(productDetails);

    const productName = document.createElement('h3');
    productName.textContent = `Product ${productName}`;
    productDetails.appendChild(productName);

    const productPriceElement = document.createElement('p');
    productPriceElement.textContent = `Precio: ${productPrice}€`;
    productDetails.appendChild(productPriceElement);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.classList.add('remove-button');
    cartItem.appendChild(removeButton);

    removeButton.addEventListener('click', () => {
        cartItem.remove();
        updateCartTotal();
    });

    return cartItem;
}

function updateCartTotal() {
    const cartContent = document.querySelector('.cart-content');
    const cartItems = cartContent.querySelectorAll('.cart-item');
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const productPriceElement = cartItem.querySelector('.product-details p');
        const productPrice = parseFloat(productPriceElement.textContent.split(' ')[1]);
        totalPrice += productPrice;
    });

    const cartTotalAmount = document.querySelector('.cart-total-amount');
    cartTotalAmount.textContent = `${totalPrice.toFixed(2)}€`;
}