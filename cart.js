document.addEventListener('DOMContentLoaded', () => {
    const cartItemsTable = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const cartTotalElement = document.getElementById('cart-total');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    function updateCart() {
        cartItemsTable.innerHTML = ''; 

        total = 0; 

        cart.forEach((item, index) => {
            let row = cartItemsTable.insertRow();
            
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            
            cell1.textContent = item.product;
            cell2.textContent = `₹${parseFloat(item.price).toFixed(2)}`;
            cell3.textContent = item.quantity;
            cell4.textContent = `₹${(item.price * item.quantity).toFixed(2)}`;
            
            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-item');
            removeButton.dataset.index = index;
            removeButton.addEventListener('click', removeItem);
            cell5.appendChild(removeButton);

            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: ₹${total.toFixed(2)}`;
    }

    function removeItem(event) {
        const index = event.target.dataset.index;
        cart.splice(index, 1); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCart(); 
    }

    updateCart();
});
