document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.add_to_cart');
  const cartItemsContainer = document.querySelector('.cart_items');
  const cartTotalEl = document.getElementById('cart_total');
  let total = 0;

  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.closest('.card_content');
      const imgSrc = product.querySelector('img').src;
      const title = product.querySelector('.card_detail_title').textContent;
      const description = product.querySelector('.card_description')?.textContent || '';
      const priceText = product.querySelector('.proposition_newPrice').textContent;
      const price = parseFloat(priceText.replace('$',''));

      console.log(title);
      
      // Créer l'item pour le panier
      const cartItem = document.createElement('div');
      cartItem.className = 'cart_item';
      cartItem.innerHTML = `
        <img src="${imgSrc}" alt="${title}">
        <div>
          <h4>${title}</h4>
          <p>${description}</p>
          <span class="price">$${price.toFixed(2)}</span>
        </div>
        <span class="remove_cart_item">❌</span>
      `;

      cartItemsContainer.appendChild(cartItem);

      // Mettre à jour le total
      total += price;
      cartTotalEl.textContent = total.toFixed(2);

      // Supprimer du panier
      const removeBtn = cartItem.querySelector('.remove_cart_item');
      removeBtn.addEventListener('click', e => {
        e.stopPropagation();
        cartItem.remove();
        total -= price;
        cartTotalEl.textContent = total.toFixed(2);
      });
    });
  });
  console.log(cartItemsContainer);
});



