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