// Məhsul məlumatları (Backend-dən gələn datanı simulyasiya edir)
const products = [
    { id: 1, name: "Sarı Banan (kq)", price: 2.45, category: "Meyvə", img: "images/banana.jpg" },
    { id: 2, name: "Süd 1.5% (1L)", price: 1.95, category: "Süd", img: "images/milk.jpg" },
    { id: 3, name: "Nar Şirəsi", price: 3.20, category: "İçki", img: "images/pom-juice.jpg" },
    { id: 4, name: "Alma Qırmızı", price: 1.50, category: "Meyvə", img: "images/red-apple.jpg" }
];

let cartCount = 0;

// Məhsulları ekranda göstərən funksiya
function displayProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = ""; // Köhnə məzmunu təmizlə

    items.forEach(item => {
        grid.innerHTML += `
            <div class="card">
                <img src="${item.img}" alt="${item.name}">
                <h4>${item.name}</h4>
                <span class="price">${item.price.toFixed(2)} ₼</span>
                <button class="buy-btn" onclick="addToCart()">Səbətə at</button>
            </div>
        `;
    });
}

// Səbətə artım funksiyası
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert("Məhsul səbətə əlavə olundu!");
}

// Kateqoriya filtrasiyası
function filterCategory(cat) {
    document.getElementById('pageTitle').innerText = cat;
    if(cat === 'Hamısı') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}

// Səhifə yüklənəndə məhsulları gətir
window.onload = () => displayProducts(products);

// Axtarış funksiyası
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // Yazılan mətni kiçik hərflərə çeviririk
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) // Məhsul adında axtarış sözü varmı?
    );

    // Başlığı yeniləyək
    const pageTitle = document.getElementById('pageTitle');
    if (searchTerm === "") {
        pageTitle.innerText = "Hamısı";
    } else {
        pageTitle.innerText = `Axtarış nəticəsi: "${searchTerm}"`;
    }

    // Əgər məhsul tapılmasa, mesaj göstərək
    if (filteredProducts.length === 0) {
        document.getElementById('productGrid').innerHTML = `<p style="padding: 20px;">Təəssüf ki, "${searchTerm}" üzrə məhsul tapılmadı.</p>`;
    } else {
        displayProducts(filteredProducts); // Tapılanları ekrana çıxar
    }
}

// Düyməyə klik hadisəsini dinləmək (HTML-də onclick yoxdursa)
document.querySelector('.search-box button').addEventListener('click', searchProducts);

// Enter düyməsi ilə axtarış imkanı
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

const cartButton = document.getElementById('cartButton');
const cartDropdown = document.getElementById('cartDropdown');

// Səbət düyməsinə klikləyəndə
cartButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Klik hadisəsinin yayılmasını dayandırır
    cartDropdown.classList.toggle('active');
});

// Səhifənin istənilən yerinə klikləyəndə səbəti bağla
window.addEventListener('click', () => {
    if (cartDropdown.classList.contains('active')) {
        cartDropdown.classList.remove('active');
    }
});

// Səbət pəncərəsinin özünə klikləyəndə bağlanmasın
cartDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
});