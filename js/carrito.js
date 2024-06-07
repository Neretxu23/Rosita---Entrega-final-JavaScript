const compraButton = document.querySelector('.compra-b');

compraButton.addEventListener('click', () => {
  const cartContent = document.querySelector('.cart-content');
  const cartItems = cartContent.querySelectorAll('.cart-item');

  if (cartItems.length > 0) {
    const totalAmount = document.querySelector('.cart-total-amount').textContent;
    const cartData = [];

    cartItems.forEach(item => {
      const productId = item.dataset.productId;
      const quantity = item.dataset.quantity;
      cartData.push({ productId, quantity });
    });
 
    fetch('/api/compra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartData, totalAmount })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const mensaje = `¡Gracias por su compra! Su pedido ha sido procesado con éxito. El total de su compra es de ${totalAmount}.`;
        mostrarMensaje(mensaje);
        // Vaciar el carrito después de mostrar el mensaje
        setTimeout(() => {
          cartContent.innerHTML = '';
          document.querySelector('.cart-total-amount').textContent = '0.00€';
        }, 3000); // Vaciar el carrito después de 3 segundos
      } else {
        mostrarMensaje('Error al procesar la compra. Por favor, inténtelo de nuevo.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      mostrarMensaje('Error al procesar la compra. Por favor, inténtelo de nuevo.');
    });
  } else {
    mostrarMensaje('No hay artículos en el carrito. Por favor, agregue algunos productos antes de realizar la compra.');
  }
});

function mostrarMensaje(mensaje) {
  const mensajeContainer = document.createElement('div');
  mensajeContainer.classList.add('mensaje-container');
  mensajeContainer.innerHTML = `<p>${mensaje}</p>`;

  const main = document.querySelector('main');
  main.insertBefore(mensajeContainer, cartContent.nextSibling);

  setTimeout(() => {
    mensajeContainer.remove();
  }, 3000);
}


const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const cartCountValue = parseInt(cartCount.textContent);
    cartCount.textContent = cartCountValue + 1;
  });
});