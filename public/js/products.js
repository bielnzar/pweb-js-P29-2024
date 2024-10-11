document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            const productGrid = document.querySelector('.product-grid');
            data.products.slice(0, 10).forEach(product => {
                const productCard = `
                    <div class="product-card">
                        <img src="${product.thumbnail}" alt="${product.title}" />
                        <h3>${product.title}</h3>
                        <p>Rp ${(product.price * 15000).toLocaleString('id-ID')}</p>
                        <a href="#" class="buy-button">Tambah ke Keranjang</a>
                    </div>
                `;
                productGrid.innerHTML += productCard;
            });
        })
        .catch(error => console.error('Error:', error));
});