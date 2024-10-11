document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartIcon = document.querySelector('.cart');
    const cartModal = document.querySelector('.cart-modal');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const checkoutButton = document.querySelector('.checkout-button');

    function setupCartFunctionality() {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.toggle('active');
            updateCartDisplay();
        });

        checkoutButton.addEventListener('click', function() {
            alert(`Total produk: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\nTotal harga: Rp ${calculateTotal().toLocaleString('id-ID')}`);
        });

        loadCartFromLocalStorage();
        updateCartDisplay();
        updateCartCount();
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }

    function addToCart(product) {
        console.log('Menambahkan produk:', product); 
        try {
            if (!product || !product.id) {
                throw new Error('Produk tidak valid');
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Terjadi kesalahan saat menambahkan produk ke keranjang. Silakan coba lagi.');
        }
    }

    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<li>Tidak ada item di keranjang.</li>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <li>
                    ${item.title} - Rp ${(item.price * 15000).toLocaleString('id-ID')} x ${item.quantity}
                    <button class="remove-item" data-id="${item.id}">-</button>
                    <button class="add-item" data-id="${item.id}">+</button>
                </li>
            `).join('');
        }
        attachCartItemListeners();
    }

    function attachCartItemListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        const addButtons = document.querySelectorAll('.add-item');

        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });

        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = cart.find(item => item.id === productId);
                if (product) {
                    console.log('Menambahkan item:', product); 
                    addToCart(product);
                }
            });
        });
    }

    function calculateTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((total, item) => total + item.price * item.quantity * 15000, 0);
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }


    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.setupCartFunctionality = setupCartFunctionality;
});