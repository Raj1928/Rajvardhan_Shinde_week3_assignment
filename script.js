document.addEventListener('DOMContentLoaded', () => {

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
      
            const productItem = button.closest('.product-item');
            const productName = button.getAttribute('data-product');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const quantityInput = productItem.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value);

            if (isNaN(quantity) || quantity <= 0) {
                alert('Please enter a valid quantity.');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ product: productName, price: productPrice, quantity: quantity });
            localStorage.setItem('cart', JSON.stringify(cart));

            window.location.href = 'cart.html';
        });
    });

    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const addToCartModal = document.getElementById('add-to-cart-modal');
    const productImages = document.querySelectorAll('.product-image');

    productImages.forEach(image => {
        image.addEventListener('click', () => {
            const productTitle = image.nextElementSibling.textContent; 
            const productPrice = image.nextElementSibling.nextElementSibling.textContent; 
            const productDescription = image.nextElementSibling.nextElementSibling.nextElementSibling.textContent;

            modalImage.src = image.src;
            modalTitle.textContent = productTitle;
            modalPrice.textContent = productPrice;
            modalDescription.textContent = productDescription;

            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    addToCartModal.addEventListener('click', () => {
        const quantityInput = document.getElementById('modal-quantity');
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(modalPrice.textContent.replace('₹', '').trim()); 

        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        if (isNaN(price)) {
            alert('Invalid price format.');
            return;
        }
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ product: modalTitle.textContent, price: price, quantity: quantity });
        localStorage.setItem('cart', JSON.stringify(cart));

        window.location.href = 'cart.html';
    });
});
