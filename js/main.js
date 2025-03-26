// Фильтрация товаров
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');

        const category = this.dataset.category;
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            if (!category || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

// Добавление в корзину
document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.querySelector('.price').textContent);

        // Добавляем товар в корзину
        addToCart(productId, productName, price);

        // Анимация добавления
        this.textContent = 'Добавлено!';
        setTimeout(() => {
            this.textContent = 'В корзину';
        }, 1000);
    });
});

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalCount;
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});