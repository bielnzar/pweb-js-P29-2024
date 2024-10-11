document.addEventListener('DOMContentLoaded', function() {
    let products = [];
    const categories = ['Makeup', 'Skincare', 'Parfum'];
    
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            products = data.products.slice(0, 10).map(product => {
                // Menentukan kategori berdasarkan jenis produk
                let category = 'Parfum';
                if (product.title.toLowerCase().includes('mascara') || 
                    product.title.toLowerCase().includes('eyeshadow') || 
                    product.title.toLowerCase().includes('lipstick') ||
                    product.title.toLowerCase().includes('powder')) {
                    category = 'Makeup';
                } else if (product.title.toLowerCase().includes('nail')) {
                    category = 'Skincare';
                }
                return {...product, category};
            });
            displayProducts(products);
            setupCategoryFilter();
        })
        .catch(error => console.error('Error:', error));

    function displayProducts(productsToShow) {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';
        productsToShow.forEach(product => {
            const productCard = `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.thumbnail}" alt="${product.title}" />
                    <h3>${product.title}</h3>
                    <p>Kategori: ${product.category}</p>
                    <p>Rp ${(product.price * 15000).toLocaleString('id-ID')}</p>
                    <a href="#" class="buy-button">Tambah ke Keranjang</a>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    }

    function setupCategoryFilter() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filter';
        filterContainer.innerHTML = `
            <h3>Filter berdasarkan Kategori:</h3>
            <select id="category-select">
                <option value="all">Semua Kategori</option>
                ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
            </select>
        `;
        
        const productSection = document.querySelector('#products .container');
        productSection.insertBefore(filterContainer, productSection.firstChild);

        document.getElementById('category-select').addEventListener('change', function() {
            const selectedCategory = this.value;
            if (selectedCategory === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === selectedCategory);
                displayProducts(filteredProducts);
            }
        });
    }
});