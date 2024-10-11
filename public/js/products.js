document.addEventListener('DOMContentLoaded', function() {
    let products = [];
    const categories = ['Makeup', 'Skincare', 'Parfum'];
    let itemsPerPage = 5; 
    let currentCategory = 'all';
    
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            products = data.products.slice(0, 10).map(product => {
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
            setupItemsPerPageFilter();
            setupCategoryFilter();
            updateProductDisplay();
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
                    <button class="buy-button" onclick='addToCart(${JSON.stringify(product)})'>Tambah ke Keranjang</button>
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
            currentCategory = this.value;
            updateProductDisplay();
        });
    }

    function setupItemsPerPageFilter() {
        const itemsPerPageContainer = document.createElement('div');
        itemsPerPageContainer.className = 'items-per-page-filter';
        itemsPerPageContainer.innerHTML = `
            <h3>Jumlah Item per Halaman:</h3>
            <select id="items-per-page-select">
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
        `;
        
        const productSection = document.querySelector('#products .container');
        productSection.insertBefore(itemsPerPageContainer, productSection.firstChild);

        document.getElementById('items-per-page-select').addEventListener('change', function() {
            itemsPerPage = parseInt(this.value);
            updateProductDisplay();
        });
    }

    function updateProductDisplay() {
        let filteredProducts = currentCategory === 'all' ? products : products.filter(product => product.category === currentCategory);
        displayProducts(filteredProducts.slice(0, itemsPerPage));
    }
});
