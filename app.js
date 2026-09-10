/**
 * daisyfumarket - Marketplace Application Core JavaScript
 * Firebase: Firestore (data) + Auth (login) + Storage (images)
 */

// ==========================================
// 0. FIREBASE INITIALIZATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCizKUeVCy_3Wr9YQkw9B7xQ2GPyjN8H-I",
  authDomain: "kasir-syfu.firebaseapp.com",
  projectId: "kasir-syfu",
  storageBucket: "kasir-syfu.firebasestorage.app",
  messagingSenderId: "399419573703",
  appId: "1:399419573703:web:c3764021249482cbfdc5e2"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// ==========================================
// 1. DUMMY DATA PRODUCT CATALOG (16 ITEMS)
// ==========================================
const INITIAL_PRODUCTS = [
  {
    id: 'PRD-001',
    name: 'Nasi Goreng Spesial Rempah Nusantara',
    category: 'Makanan & Minuman',
    price: 28000,
    rating: 4.9,
    reviewsCount: 142,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    description: 'Nasi goreng racikan resep warisan dengan telur, ayam suwir, bakso, dan piring kerupuk renyah.',
    stock: 45
  },
  {
    id: 'PRD-002',
    name: 'Kopi Susu Gula Aren Creamy 500ml',
    category: 'Makanan & Minuman',
    price: 18000,
    rating: 4.8,
    reviewsCount: 215,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    description: 'Espresso robusta & arabica dipadu susu segar dingin dan gula aren murni khas Nusantara.',
    stock: 60
  },
  {
    id: 'PRD-003',
    name: 'Snack Gourmet Potato Chips Truffle',
    category: 'Makanan & Minuman',
    price: 15000,
    rating: 4.6,
    reviewsCount: 88,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    description: 'Keripik kentang pilihan berpotongan tebal dengan taburan bumbu truffle khas gurih.',
    stock: 80
  },
  {
    id: 'PRD-004',
    name: 'Kaos Oversize Cotton Combed 30s Slate',
    category: 'Pakaian & Fashion',
    price: 85000,
    rating: 4.9,
    reviewsCount: 310,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'Bahan 100% cotton combed super lembut, tidak panas, dan potongan oversized ala streetwear modern.',
    stock: 30
  },
  {
    id: 'PRD-005',
    name: 'Jaket Denim Classic Vintage Unisex',
    category: 'Pakaian & Fashion',
    price: 245000,
    rating: 4.7,
    reviewsCount: 94,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    description: 'Bahan denim tebal berkualitas premium dengan wash indigo klasik yang stylish dan tahan lama.',
    stock: 18
  },
  {
    id: 'PRD-006',
    name: 'Sepatu Sneakers Urban White Minimalist',
    category: 'Pakaian & Fashion',
    price: 350000,
    rating: 4.9,
    reviewsCount: 180,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    description: 'Sneakers kulit sintetis elastis dengan insole cushioned empuk untuk kenyamanan aktivitas harian.',
    stock: 25
  },
  {
    id: 'PRD-007',
    name: 'Topi Snapback Streetwear Edition',
    category: 'Pakaian & Fashion',
    price: 65000,
    rating: 4.5,
    reviewsCount: 64,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    description: 'Topi dengan pengatur ukuran snapback belakang dan bordir presisi berkualitas tinggi.',
    stock: 50
  },
  {
    id: 'PRD-008',
    name: 'TWS Wireless Earphone Active Noise Cancelling',
    category: 'Elektronik',
    price: 199000,
    rating: 4.8,
    reviewsCount: 420,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    description: 'Koneksi Bluetooth 5.3 stabil, bass bertenaga, daya tahan baterai hingga 28 jam dengan case.',
    stock: 40
  },
  {
    id: 'PRD-009',
    name: 'Smartwatch Sport Fitness Tracker AMOLED',
    category: 'Elektronik',
    price: 299000,
    rating: 4.9,
    reviewsCount: 289,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    description: 'Layar jernih AMOLED, monitor detak jantung, SpO2, sleep tracker, dan ketahanan air 5ATM.',
    stock: 22
  },
  {
    id: 'PRD-010',
    name: 'Keyboard Mekanikal RGB Mechanical Switch',
    category: 'Elektronik',
    price: 450000,
    rating: 4.7,
    reviewsCount: 115,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: 'Switch mekanikal tactile hotswap, backlight RGB 18 mode lighting, dan kabel braided Type-C.',
    stock: 15
  },
  {
    id: 'PRD-011',
    name: 'Fast Charger 65W GaN Dual Port USB-C & USB-A',
    category: 'Elektronik',
    price: 145000,
    rating: 4.8,
    reviewsCount: 98,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    description: 'Teknologi GaN menghemat energi, ukuran ringkas, kompatibel untuk smartphone, tablet & laptop.',
    stock: 35
  },
  {
    id: 'PRD-012',
    name: 'Tumbler Termos Stainless Steel 500ml',
    category: 'Rumah Tangga',
    price: 75000,
    rating: 4.9,
    reviewsCount: 340,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    description: 'Double wall vacuum insulation, menjaga dingin/panas hingga 12 jam, bebas BPA & anti bocor.',
    stock: 70
  },
  {
    id: 'PRD-013',
    name: 'Lampu Meja LED Smart Touch Eye Care',
    category: 'Rumah Tangga',
    price: 110000,
    rating: 4.6,
    reviewsCount: 76,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80',
    description: 'Lampu baca dengan 3 mode kecerahan touch sensor, ramah mata, dan leher fleksibel 360 derajat.',
    stock: 28
  },
  {
    id: 'PRD-014',
    name: 'Air Humidifier Essential Oil Diffuser 300ml',
    category: 'Rumah Tangga',
    price: 135000,
    rating: 4.7,
    reviewsCount: 152,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1545231027-637d2f6210f8?auto=format&fit=crop&w=600&q=80',
    description: 'Pelembab udara ultra-hening dengan lampu malam 7 warna LED dan timer otomatis.',
    stock: 40
  },
  {
    id: 'PRD-015',
    name: 'Serum Wajah Glowing Vitamin C + Niacinamide',
    category: 'Kesehatan & Kecantikan',
    price: 95000,
    rating: 4.8,
    reviewsCount: 204,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: 'Formula mencerahkan noda hitam, meratakan warna kulit, dan meningkatkan kelembapan alami.',
    stock: 55
  },
  {
    id: 'PRD-016',
    name: 'Sunscreen UV Shield SPF 50+ PA++++',
    category: 'Kesehatan & Kecantikan',
    price: 68000,
    rating: 4.9,
    reviewsCount: 512,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'Tabur surya tekstur watery ringan, tanpa whitecast, cepat meresap, dan aman untuk kulit sensitif.',
    stock: 90
  },
  {
    id: 'PRD-017',
    name: 'Sabun Mandi Gentle Care Body Wash 500ml',
    category: 'Kesehatan & Kecantikan',
    price: 35000,
    rating: 4.7,
    reviewsCount: 180,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=600&q=80',
    description: 'Sabun cair dengan pH seimbang, melembapkan kulit, dan aroma segar tahan lama.',
    stock: 100
  },
  {
    id: 'PRD-018',
    name: 'Masker Wajah Brightening Sheet Mask Pack',
    category: 'Kesehatan & Kecantikan',
    price: 25000,
    rating: 4.6,
    reviewsCount: 95,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=80',
    description: 'Sheet mask dengan kandungan niacinamide & vitamin C untuk mencerahkan kulit secara instan.',
    stock: 150
  },
  {
    id: 'PRD-019',
    name: 'Parfum Unisex Eau de Parfum 100ml',
    category: 'Kesehatan & Kecantikan',
    price: 185000,
    rating: 4.8,
    reviewsCount: 67,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'Parfum dengan aroma woody & floral yang elegan, tahan lama hingga 12 jam.',
    stock: 30
  },
  {
    id: 'PRD-020',
    name: 'Ransel Laptop Anti Theft 15.6 inch',
    category: 'Pakaian & Fashion',
    price: 275000,
    rating: 4.8,
    reviewsCount: 143,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    description: 'Ransel anti maling dengan slot USB charging, material防水, dan desain ergonomis.',
    stock: 25
  },
  {
    id: 'PRD-021',
    name: 'Dapur Cookware Set Panci & Wajan 5pcs',
    category: 'Rumah Tangga',
    price: 450000,
    rating: 4.9,
    reviewsCount: 88,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80',
    description: 'Set panci & wajan anti lengket marble coating, bebas PFOA, cocok untuk semua kompor.',
    stock: 15
  },
  {
    id: 'PRD-022',
    name: 'Blender Portable USB Mini 380ml',
    category: 'Elektronik',
    price: 125000,
    rating: 4.5,
    reviewsCount: 210,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
    description: 'Blender portabel baterai rechargeable, mudah dibawa traveling, 6 bilah pisau stainless.',
    stock: 45
  },
  {
    id: 'PRD-023',
    name: 'Tas Selempang Crossbody Bag Waterproof',
    category: 'Pakaian & Fashion',
    price: 125000,
    rating: 4.7,
    reviewsCount: 156,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    description: 'Tas selempang anti air dengan banyak kompartemen, ringan dan nyaman untuk aktivitas harian.',
    stock: 40
  },
  {
    id: 'PRD-024',
    name: 'Sepatu Sandal Casual Sport Outdoor',
    category: 'Pakaian & Fashion',
    price: 185000,
    rating: 4.6,
    reviewsCount: 198,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=600&q=80',
    description: 'Sandal sport dengan sol anti slip, ringan, breathable mesh, cocok untuk outdoor & daily.',
    stock: 55
  },
  {
    id: 'PRD-025',
    name: 'Mie Instan Goreng Premium Spesial 5 Pack',
    category: 'Makanan & Minuman',
    price: 22000,
    rating: 4.8,
    reviewsCount: 320,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80',
    description: 'Mie goreng premium dengan bumbu khas, topping ayam suwir, dan kerupuk udang.',
    stock: 200
  },
  {
    id: 'PRD-026',
    name: 'Teh Hijau Matcha Latte Premium 20 Sachet',
    category: 'Makanan & Minuman',
    price: 45000,
    rating: 4.7,
    reviewsCount: 145,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80',
    description: 'Matcha latte bubuk premium dari teh hijau pilihan, tanpa pemanis buatan.',
    stock: 80
  },
  {
    id: 'PRD-027',
    name: 'Powerbank Fast Charging 20000mAh LED',
    category: 'Elektronik',
    price: 195000,
    rating: 4.8,
    reviewsCount: 267,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80',
    description: 'Powerbank kapasitas besar 20000mAh, dual output USB-C & Lightning, fast charging 22.5W.',
    stock: 35
  },
  {
    id: 'PRD-028',
    name: 'Set Peralatan Dapur Stainless Steel 12pcs',
    category: 'Rumah Tangga',
    price: 285000,
    rating: 4.7,
    reviewsCount: 92,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=600&q=80',
    description: 'Set spatula, sendok, garpu masak stainless steel, tahan panas, dengan stand holder.',
    stock: 20
  },
  {
    id: 'PRD-029',
    name: 'Headphone Over Ear Wireless ANC Pro',
    category: 'Elektronik',
    price: 389000,
    rating: 4.9,
    reviewsCount: 178,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Headphone over-ear ANC, bass jernih, baterai 40 jam, foldable design, microphone HD.',
    stock: 18
  },
  {
    id: 'PRD-030',
    name: 'Organizer Box Penyimpanan Kosmetik Acrylic',
    category: 'Rumah Tangga',
    price: 85000,
    rating: 4.5,
    reviewsCount: 134,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=600&q=80',
    description: 'Tempat penyimpanan kosmetik transparan acrylic, multi layer, elegan dan rapi.',
    stock: 60
  },
  {
    id: 'PRD-031',
    name: 'Sneakers Running Sport Breathable Shoes',
    category: 'Pakaian & Fashion',
    price: 299000,
    rating: 4.8,
    reviewsCount: 225,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    description: 'Sepatu lari breathable mesh, sole empuk cushioning, ringan untuk jogging & gym.',
    stock: 22
  },
  {
    id: 'PRD-032',
    name: 'Lilin Aromaterapi Soy Wax Calm Night',
    category: 'Rumah Tangga',
    price: 75000,
    rating: 4.6,
    reviewsCount: 89,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=600&q=80',
    description: 'Lilin aromaterapi dari soy wax murni, aroma lavender & vanilla, tahan bakar 40 jam.',
    stock: 70
  }
];

// Seed Initial Transactions Sample Data
const INITIAL_TRANSACTIONS = [
  {
    id: 'TRX-20260806-001',
    date: '2026-08-06T14:20:00.000Z',
    customerName: 'Budi Santoso',
    customerPhone: '081234567890',
    customerAddress: 'Jl. Sudirman No. 45, Jakarta Selatan',
    items: [
      { id: 'PRD-008', name: 'TWS Wireless Earphone Active Noise Cancelling', price: 199000, quantity: 1, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80' },
      { id: 'PRD-012', name: 'Tumbler Termos Stainless Steel 500ml', price: 75000, quantity: 2, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' }
    ],
    totalAmount: 349000,
    paymentMethod: 'Transfer Bank (BCA)',
    status: 'Selesai'
  },
  {
    id: 'TRX-20260806-002',
    date: '2026-08-06T16:45:00.000Z',
    customerName: 'Siti Rahmawati',
    customerPhone: '085712345678',
    customerAddress: 'Jl. Dago Atas No. 12, Bandung',
    items: [
      { id: 'PRD-016', name: 'Sunscreen UV Shield SPF 50+ PA++++', price: 68000, quantity: 2, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80' },
      { id: 'PRD-002', name: 'Kopi Susu Gula Aren Creamy 500ml', price: 18000, quantity: 3, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80' }
    ],
    totalAmount: 190000,
    paymentMethod: 'E-Wallet (Gopay)',
    status: 'Selesai'
  },
  {
    id: 'TRX-20260807-003',
    date: '2026-08-07T09:15:00.000Z',
    customerName: 'Rian Hidayat',
    customerPhone: '087899887766',
    customerAddress: 'Jl. Malioboro No. 88, Yogyakarta',
    items: [
      { id: 'PRD-004', name: 'Kaos Oversize Cotton Combed 30s Slate', price: 85000, quantity: 2, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80' },
      { id: 'PRD-006', name: 'Sepatu Sneakers Urban White Minimalist', price: 350000, quantity: 1, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' }
    ],
    totalAmount: 520000,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Selesai'
  }
];

// ==========================================
// 2. APP STATE MANAGEMENT (Firestore-backed)
// ==========================================
class StoreState {
  constructor() {
    this.products = [];
    this.cart = [];
    this.transactions = [];
    this.uid = null;
    this.activeCategory = 'Semua';
    this.searchQuery = '';
    this.bestSellerOnly = false;
    this.currentView = 'catalog';

    auth.onAuthStateChanged((user) => {
      if (demoMode) return;
      if (user) {
        this.uid = user.uid;
        Promise.all([this.loadProducts(), this.loadCart(), this.loadTransactions()]).then(() => {
          updateFilterUI();
          renderProductGrid();
          renderInventoryTable();
          renderDashboardStats();
          renderReportsView();
        }).catch(() => {});
      } else {
        this.uid = null;
        this.products = [];
        this.cart = [];
        this.transactions = [];
        updateFilterUI();
        renderProductGrid();
        renderInventoryTable();
        renderDashboardStats();
        renderReportsView();
        updateCartBadge();
      }
      const overlay = document.getElementById('auth-overlay');
      const logoutBtn = document.getElementById('btn-logout');
      if (overlay) { if (user) overlay.classList.add('hidden'); else overlay.classList.remove('hidden'); }
      if (logoutBtn) { if (user) logoutBtn.classList.remove('hidden'); else logoutBtn.classList.add('hidden'); }
    });
  }

  async loadProducts() {
    if (!this.uid || demoMode) return;
    try {
      const snap = await db.collection('products').get();
      if (snap.empty) {
        const local = JSON.parse(localStorage.getItem('nexamart_products')) || [...INITIAL_PRODUCTS];
        for (const p of local) {
          const id = p.id || ('PRD-' + Date.now().toString().slice(-6).toUpperCase());
          await db.collection('products').doc(id).set({ ...p, id });
        }
        this.products = local.map(p => ({ id: p.id, ...p }));
      } else {
        this.products = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      showToast('Gagal memuat produk dari cloud: ' + e.message, 'error');
      this.products = JSON.parse(localStorage.getItem('nexamart_products')) || [...INITIAL_PRODUCTS];
    }
    this.ensureBarcodes();
  }

  async addProduct(product) {
    const id = 'PRD-' + Date.now().toString().slice(-6).toUpperCase();
    product.id = id;
    product.stock = product.stock || 0;
    product.buyPrice = product.buyPrice || 0;
    product.sellPrice = product.sellPrice || product.price;
    product.isBestSeller = product.isBestSeller || false;
    product.reviewsCount = product.reviewsCount || 0;
    this.products.unshift(product);
    try { if (!demoMode) await db.collection('products').doc(id).set(product); } catch (e) { showToast('Gagal menyimpan produk ke cloud: ' + e.message, 'error'); }
    renderProductGrid(); renderInventoryTable(); renderDashboardStats();
  }

  async updateProduct(updatedProduct) {
    const idx = this.products.findIndex(p => p.id === updatedProduct.id);
    if (idx > -1) this.products[idx] = { ...this.products[idx], ...updatedProduct };
    try { if (!demoMode) await db.collection('products').doc(updatedProduct.id).set(updatedProduct, { merge: true }); } catch (e) { showToast('Gagal memperbarui produk: ' + e.message, 'error'); }
    renderProductGrid(); renderInventoryTable(); renderDashboardStats();
  }

  async deleteProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
    try { if (!demoMode) await db.collection('products').doc(productId).delete(); } catch (e) { showToast('Gagal menghapus produk: ' + e.message, 'error'); }
    renderProductGrid(); renderInventoryTable(); renderDashboardStats();
  }

  ensureBarcodes() {
    let changed = false;
    this.products.forEach(p => {
      if (!p.barcode || !String(p.barcode).trim()) {
        const num = parseInt(String(p.id || '').replace(/\D/g, ''), 10) || 0;
        p.barcode = makeEAN13('899' + String(num).padStart(9, '0'));
        changed = true;
      }
    });
    if (changed) this.syncProducts();
  }

  syncProducts() {
    if (demoMode) return;
    this.products.forEach(p => { db.collection('products').doc(p.id).set(p).catch(() => {}); });
  }

  async loadCart() {
    if (!this.uid || demoMode) return;
    try { const snap = await db.collection('carts').doc(this.uid).get(); this.cart = snap.exists() ? (snap.data().items || []) : []; } catch (e) { this.cart = []; }
    updateCartBadge(); renderCartDrawer();
  }

  saveCart() { if (!this.uid) return; if (demoMode) return; db.collection('carts').doc(this.uid).set({ items: this.cart }).catch(() => {}); }

  addToCart(productId, qty = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    const existingIndex = this.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) { this.cart[existingIndex].quantity += qty; }
    else { this.cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, quantity: qty }); }
    this.saveCart(); updateCartBadge(); renderCartDrawer();
    showToast(`"${product.name}" ditambahkan ke keranjang!`, 'success');
  }

  getProductById(productId) { return this.products.find(p => p.id === productId); }

  updateCartQty(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) { this.removeFromCart(productId); return; }
    this.saveCart(); updateCartBadge(); renderCartDrawer();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.saveCart(); updateCartBadge(); renderCartDrawer();
    showToast('Item berhasil dihapus dari keranjang.', 'success');
  }

  clearCart() { this.cart = []; this.saveCart(); updateCartBadge(); renderCartDrawer(); }

  getCartTotal() { return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0); }
  getCartCount() { return this.cart.reduce((sum, item) => sum + item.quantity, 0); }

  getFilteredProducts() {
    return this.products.filter(p => {
      const matchCategory = this.activeCategory === 'Semua' || p.category === this.activeCategory;
      const query = this.searchQuery.toLowerCase().trim();
      const matchSearch = !query || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || (p.barcode && String(p.barcode).includes(query));
      const matchBestSeller = !this.bestSellerOnly || p.isBestSeller;
      return matchCategory && matchSearch && matchBestSeller;
    });
  }

  async loadTransactions() {
    if (!this.uid || demoMode) return;
    try { const snap = await db.collection('transactions').get(); this.transactions = snap.docs.map(d => ({ id: d.id, ...d.data() })); } catch (e) { this.transactions = []; }
  }

  async addTransaction(transactionData) {
    if (demoMode) {
      this.transactions.unshift(transactionData);
      return;
    }
    try { await db.collection('transactions').add(transactionData); } catch (e) { showToast('Gagal menyimpan transaksi: ' + e.message, 'error'); }
    await this.loadTransactions();
  }

  async clearAllTransactions() {
    if (demoMode) {
      this.transactions = [];
      renderReportsView(); renderDashboardStats();
      return;
    }
    try {
      const snap = await db.collection('transactions').get();
      const batch = db.batch();
      snap.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
      this.transactions = [];
    } catch (e) { showToast('Gagal menghapus transaksi: ' + e.message, 'error'); }
    renderReportsView(); renderDashboardStats();
  }

  async uploadImage(file) {
    if (!this.uid || !file) return '';
    if (demoMode) return URL.createObjectURL(file);
    const ext = file.name.split('.').pop().toLowerCase();
    const path = `products/${this.uid}/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
    const storageRef = storage.ref(path);
    const snapshot = await storageRef.put(file);
    return await snapshot.ref.getDownloadURL();
  }
}

// Global state instance
let demoMode = false;
const store = new StoreState();

// Auth helpers
let authMode = 'login';

function enterDemoMode() {
  demoMode = true;
  store.uid = 'demo';
  store.products = [...INITIAL_PRODUCTS];
  store.cart = [];
  store.transactions = [...INITIAL_TRANSACTIONS];
  store.ensureBarcodes();
  const overlay = document.getElementById('auth-overlay');
  const logoutBtn = document.getElementById('btn-logout');
  if (overlay) overlay.classList.add('hidden');
  if (logoutBtn) logoutBtn.classList.remove('hidden');
  updateFilterUI();
  renderProductGrid();
  renderInventoryTable();
  renderDashboardStats();
  renderReportsView();
  updateCartBadge();
  showToast('Mode Demo aktif — data hanya tersimpan di browser ini.', 'success');
}

function toggleAuthMode() {
  authMode = authMode === 'login' ? 'register' : 'login';
  const title = document.getElementById('auth-title');
  const subtitle = document.getElementById('auth-subtitle');
  const nameField = document.getElementById('auth-name-field');
  const submitBtn = document.getElementById('auth-submit-btn');
  const switchLink = document.getElementById('auth-switch-link');
  if (authMode === 'register') {
    if (title) title.textContent = 'Daftar';
    if (subtitle) subtitle.textContent = 'Buat akun dashboard';
    if (nameField) nameField.classList.remove('hidden');
    if (submitBtn) submitBtn.textContent = 'Daftar';
    if (switchLink) switchLink.textContent = 'Sudah punya akun? Masuk';
  } else {
    if (title) title.textContent = 'Masuk';
    if (subtitle) subtitle.textContent = 'Masuk ke dashboard daisyfumarket';
    if (nameField) nameField.classList.add('hidden');
    if (submitBtn) submitBtn.textContent = 'Masuk';
    if (switchLink) switchLink.textContent = 'Belum punya akun? Daftar';
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const emailEl = document.getElementById('auth-email');
  const passEl = document.getElementById('auth-password');
  const nameEl = document.getElementById('auth-name');
  const btn = document.getElementById('auth-submit-btn');
  const errEl = document.getElementById('auth-error');
  const loadingEl = document.getElementById('auth-loading');
  const email = emailEl?.value?.trim() || '';
  const password = passEl?.value || '';
  const name = nameEl?.value?.trim() || '';
  if (!email || !password) { showToast('Isi email dan password.', 'error'); return; }
  btn.disabled = true;
  if (loadingEl) loadingEl.classList.remove('hidden');
  if (errEl) errEl.classList.add('hidden');
  try {
    if (authMode === 'login') {
      await auth.signInWithEmailAndPassword(email, password);
    } else {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
    }
  } catch (err) {
    if (errEl) { errEl.textContent = err.message; errEl.classList.remove('hidden'); }
  } finally {
    btn.disabled = false;
    if (loadingEl) loadingEl.classList.add('hidden');
  }
}

function handleLogout() {
  if (demoMode) {
    demoMode = false;
    store.uid = null;
    store.products = [];
    store.cart = [];
    store.transactions = [];
    const overlay = document.getElementById('auth-overlay');
    const logoutBtn = document.getElementById('btn-logout');
    if (overlay) overlay.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    updateCartBadge();
    renderProductGrid();
    renderInventoryTable();
    renderReportsView();
    return;
  }
  auth.signOut();
}

// Helper: Format Rupiah
function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

// ==========================================
// 2b. BARCODE HELPERS (EAN-13)
// ==========================================
function ean13CheckDigit(base12) {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = parseInt(base12[i], 10);
    sum += (i % 2 === 0) ? d : d * 3;
  }
  return (10 - (sum % 10)) % 10;
}

function makeEAN13(base) {
  const stub = String(base).replace(/\D/g, '').slice(0, 12);
  return stub + ean13CheckDigit(stub);
}

function generateUniqueBarcode() {
  let next = 1;
  store.products.forEach(p => {
    const m = String(p.barcode || '').match(/^899(\d{9})/);
    if (m) next = Math.max(next, parseInt(m[1], 10) + 1);
  });
  return makeEAN13('899' + String(next).padStart(9, '0'));
}

function renderBarcodes(scope) {
  if (!window.JsBarcode) return;
  const nodes = (scope || document).querySelectorAll('[data-barcode]');
  nodes.forEach(node => {
    const code = (node.dataset.barcode || '').trim();
    if (!code || node.dataset.rendered === '1') return;
    try {
      const fmt = /^\d{13}$/.test(code) ? 'EAN13' : 'CODE128';
      JsBarcode(node, code, {
        format: fmt,
        width: node.dataset.bwidth ? parseFloat(node.dataset.bwidth) : 1,
        height: node.dataset.bheight ? parseFloat(node.dataset.bheight) : 20,
        displayValue: false,
        margin: 1,
        background: 'transparent'
      });
      node.dataset.rendered = '1';
    } catch (e) { /* ignore invalid barcodes */ }
  });
}

// Helper: Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const isSuccess = type === 'success';
  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium toast-enter ${
    isSuccess ? 'bg-[#EE4D2D] border-[#ff8a78] text-white' : 'bg-rose-600 border-rose-400 text-white'
  }`;

  toast.innerHTML = `
    <span class="${isSuccess ? 'text-white' : 'text-rose-200'}">
      ${isSuccess ? '✓' : '✕'}
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ==========================================
// 3. UI RENDER FUNCTIONS
// ==========================================

// Render Product Grid (Shopee style)
function renderProductGrid() {
  const container = document.getElementById('product-grid');
  const emptyState = document.getElementById('product-empty');
  const resultCount = document.getElementById('result-count');
  
  if (!container) return;

  const filtered = store.getFilteredProducts();

  if (resultCount) {
    resultCount.textContent = `Menampilkan ${filtered.length} produk`;
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  const fallback = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&q=80';

  container.innerHTML = filtered.map(product => `
    <div class="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <!-- Image -->
      <div class="relative aspect-[4/4] overflow-hidden bg-slate-100">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onerror="this.onerror=null; this.src='${fallback}';"
        />
        <div class="absolute top-2 left-2 flex flex-col gap-1 z-10">
          ${product.isBestSeller ? `<span class="px-1.5 py-0.5 text-[9px] font-black rounded bg-[#EE4D2D] text-white shadow-sm">🔥 BEST</span>` : ''}
          <span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-white/90 text-[#EE4D2D] shadow-sm">${product.category}</span>
        </div>
        <button 
          onclick="openEditProductModal('${product.id}')"
          class="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-[11px] text-slate-600 hover:text-[#EE4D2D] hover:bg-white transition-colors cursor-pointer"
          title="Edit Produk"
        >✏️</button>
      </div>

      <!-- Body -->
      <div class="p-2.5 flex flex-col flex-1">
        <h3 class="text-[12px] font-medium text-slate-700 line-clamp-2 leading-snug group-hover:text-[#EE4D2D] transition-colors">
          ${product.name}
        </h3>

        <div class="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
          <span class="text-amber-500 font-bold">⭐ ${product.rating}</span>
          <span>· Terjual ${product.reviewsCount}</span>
        </div>

        <div class="mt-1.5">
          <span class="text-[16px] font-black text-[#EE4D2D]">${formatIDR(product.price)}</span>
        </div>

        <div class="mt-1.5 flex items-center justify-between border-t border-dashed border-slate-100 pt-1">
          <svg class="product-barcode" data-barcode="${product.barcode || ''}" data-bwidth="1" data-bheight="14" width="72" height="14"></svg>
          <span class="text-[8px] font-mono text-slate-400 tracking-tight">${product.barcode || '-'}</span>
        </div>

        <div class="mt-auto pt-1.5 flex items-center justify-between">
          <span class="text-[9px] text-slate-400">Stok: ${product.stock}</span>
          <button 
            onclick="handleAddToCart('${product.id}')"
            class="px-2.5 py-1.5 rounded bg-[#EE4D2D]/10 text-[#EE4D2D] hover:bg-[#EE4D2D] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
            title="Tambah ke keranjang"
          >
            🛒 + Keranjang
          </button>
        </div>
      </div>
    </div>
  `).join('');

  renderBarcodes(container);
}

// Render Cart Badge
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = store.getCartCount();
  if (badge) {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('scale-0');
      badge.classList.add('scale-100');
    } else {
      badge.classList.add('scale-0');
      badge.classList.remove('scale-100');
    }
  }
}

// Render Cart Drawer Content
function renderCartDrawer() {
  const cartItemsContainer = document.getElementById('cart-items-list');
  const cartTotalElem = document.getElementById('cart-total-price');
  const cartEmptyElem = document.getElementById('cart-empty');
  const cartFooterElem = document.getElementById('cart-footer');

  if (!cartItemsContainer) return;

  const items = store.cart;
  const total = store.getCartTotal();

  if (items.length === 0) {
    cartItemsContainer.innerHTML = '';
    cartEmptyElem.classList.remove('hidden');
    cartFooterElem.classList.add('hidden');
    if (cartTotalElem) cartTotalElem.textContent = formatIDR(0);
    return;
  }

  cartEmptyElem.classList.add('hidden');
  cartFooterElem.classList.remove('hidden');

  cartItemsContainer.innerHTML = items.map(item => `
    <div class="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-slate-100 flex-shrink-0" />
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-xs sm:text-sm text-slate-800 truncate">${item.name}</h4>
        <span class="text-xs font-semibold text-[#EE4D2D] block mt-0.5">${formatIDR(item.price)}</span>
        
        <div class="flex items-center gap-2 mt-2">
          <div class="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
            <button 
              onclick="handleCartQty('${item.id}', -1)"
              class="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
            >-</button>
            <span class="px-2.5 py-0.5 text-xs font-bold text-slate-800">${item.quantity}</span>
            <button 
              onclick="handleCartQty('${item.id}', 1)"
              class="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
            >+</button>
          </div>

          <button 
            onclick="handleCartRemove('${item.id}')" 
            class="text-xs text-rose-500 hover:text-rose-700 font-medium ml-auto transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (cartTotalElem) {
    cartTotalElem.textContent = formatIDR(total);
  }
}

// Render Transaction Reports View
function renderReportsView() {
  const transactions = store.transactions;

  // Stat calculations
  const totalRevenue = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
  const totalCount = transactions.length;

  // Calculate Best Selling Item
  const itemSalesMap = {};
  transactions.forEach(t => {
    t.items.forEach(item => {
      itemSalesMap[item.name] = (itemSalesMap[item.name] || 0) + item.quantity;
    });
  });

  let topProduct = 'Belum Ada';
  let topCount = 0;
  Object.entries(itemSalesMap).forEach(([name, count]) => {
    if (count > topCount) {
      topCount = count;
      topProduct = name;
    }
  });

  // Calculate Top Payment Method
  const methodMap = {};
  transactions.forEach(t => {
    methodMap[t.paymentMethod] = (methodMap[t.paymentMethod] || 0) + 1;
  });
  let topMethod = 'N/A';
  let maxMethodCount = 0;
  Object.entries(methodMap).forEach(([method, count]) => {
    if (count > maxMethodCount) {
      maxMethodCount = count;
      topMethod = method;
    }
  });

  // Render Stat Cards
  const statRevenue = document.getElementById('stat-revenue');
  const statCount = document.getElementById('stat-count');
  const statTopProduct = document.getElementById('stat-top-product');
  const statMethod = document.getElementById('stat-method');

  if (statRevenue) statRevenue.textContent = formatIDR(totalRevenue);
  if (statCount) statCount.textContent = `${totalCount} Transaksi`;
  if (statTopProduct) statTopProduct.textContent = topProduct;
  if (statMethod) statMethod.textContent = topMethod;

  // Render Table
  const tableBody = document.getElementById('reports-table-body');
  const reportsEmpty = document.getElementById('reports-empty');

  if (!tableBody) return;

  if (transactions.length === 0) {
    tableBody.innerHTML = '';
    if (reportsEmpty) reportsEmpty.classList.remove('hidden');
    return;
  }

  if (reportsEmpty) reportsEmpty.classList.add('hidden');

  tableBody.innerHTML = transactions.map(trx => {
    const formattedDate = new Date(trx.date).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const itemsSummary = trx.items.map(i => `${i.name} (${i.quantity}x)`).join(', ');

    return `
      <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 text-xs sm:text-sm">
        <td class="px-4 py-3.5 font-mono font-bold text-sky-600">${trx.id}</td>
        <td class="px-4 py-3.5 text-slate-500 whitespace-nowrap">${formattedDate}</td>
        <td class="px-4 py-3.5 font-medium text-slate-800">
          <div>${trx.customerName}</div>
          <div class="text-xs text-slate-400 font-normal truncate max-w-xs">${trx.customerAddress}</div>
        </td>
        <td class="px-4 py-3.5 text-slate-700 max-w-xs truncate" title="${itemsSummary}">
          ${itemsSummary}
        </td>
        <td class="px-4 py-3.5 font-extrabold text-slate-900 whitespace-nowrap">${formatIDR(trx.totalAmount)}</td>
        <td class="px-4 py-3.5 whitespace-nowrap">
          <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-sky-100 text-sky-800 border border-sky-200">
            ✓ ${trx.status}
          </span>
        </td>
         <td class="px-4 py-3.5 text-slate-600 font-medium whitespace-nowrap">${trx.paymentMethod}</td>
         <td class="px-4 py-3.5 text-center whitespace-nowrap">
           <button 
             onclick="printReceipt('${trx.id}')"
             class="px-2.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
             title="Cetak Struk ${trx.id}"
           >
             🖨️
           </button>
         </td>
       </tr>
     `;
   }).join('');
}

// Category Pills Renderer
function renderCategoryPills() {
  const container = document.getElementById('category-pills');
  if (!container) return;

  const categories = [
    'Semua',
    'Makanan & Minuman',
    'Pakaian & Fashion',
    'Elektronik',
    'Rumah Tangga',
    'Kesehatan & Kecantikan'
  ];

  container.innerHTML = categories.map(cat => {
    const isActive = store.activeCategory === cat;
    return `
      <button 
        onclick="handleCategoryChange('${cat}')"
        class="px-3.5 py-1.5 rounded-md text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
          isActive 
            ? 'bg-[#EE4D2D] text-white shadow-sm'
            : 'bg-white text-slate-600 border border-slate-200 hover:text-[#EE4D2D] hover:border-[#EE4D2D]/40'
        }"
      >
        ${cat}
      </button>
    `;
  }).join('');
}

// Update Filter UI state
function updateFilterUI() {
  renderCategoryPills();
  
  const bestSellerBtn = document.getElementById('btn-filter-bestseller');
  if (bestSellerBtn) {
    if (store.bestSellerOnly) {
      bestSellerBtn.classList.remove('bg-white', 'text-[#EE4D2D]', 'border-[#EE4D2D]/30');
      bestSellerBtn.classList.add('bg-[#FFEBE8]', 'text-[#EE4D2D]', 'border-[#EE4D2D]', 'shadow-sm');
    } else {
      bestSellerBtn.classList.add('bg-white', 'text-[#EE4D2D]', 'border-[#EE4D2D]/30');
      bestSellerBtn.classList.remove('bg-[#FFEBE8]', 'text-[#EE4D2D]', 'border-[#EE4D2D]', 'shadow-sm');
    }
  }

  const catBestBtn = document.getElementById('cat-bestseller-btn');
  if (catBestBtn) {
    if (store.bestSellerOnly) {
      catBestBtn.classList.remove('text-amber-600', 'bg-amber-50');
      catBestBtn.classList.add('bg-amber-500', 'text-white', 'shadow-sm');
    } else {
      catBestBtn.classList.add('text-amber-600', 'bg-amber-50');
      catBestBtn.classList.remove('bg-amber-500', 'text-white', 'shadow-sm');
    }
  }

  renderProductGrid();
}

// Switch Views
function switchView(viewName) {
  store.currentView = viewName;
  const catalogSection = document.getElementById('catalog-section');
  const reportsSection = document.getElementById('reports-section');
  const inventorySection = document.getElementById('inventory-section');
  const navCatalogBtn = document.getElementById('nav-btn-catalog');
  const navReportsBtn = document.getElementById('nav-btn-reports');
  const navInventoryBtn = document.getElementById('nav-btn-inventory');

  // Hide all sections
  catalogSection.classList.add('hidden');
  reportsSection.classList.add('hidden');
  if (inventorySection) inventorySection.classList.add('hidden');

  // Reset nav buttons
  const activeClass = ['text-[#EE4D2D]', 'bg-[#EE4D2D]/10'];
  const inactiveClass = ['text-slate-500', 'bg-transparent'];
  [navCatalogBtn, navReportsBtn, navInventoryBtn].forEach(btn => {
    if (btn) {
      activeClass.forEach(c => btn.classList.remove(c));
      inactiveClass.forEach(c => btn.classList.add(c));
    }
  });

  if (viewName === 'catalog') {
    catalogSection.classList.remove('hidden');
    if (navCatalogBtn) {
      inactiveClass.forEach(c => navCatalogBtn.classList.remove(c));
      activeClass.forEach(c => navCatalogBtn.classList.add(c));
    }
  } else if (viewName === 'inventory') {
    if (inventorySection) inventorySection.classList.remove('hidden');
    if (navInventoryBtn) {
      inactiveClass.forEach(c => navInventoryBtn.classList.remove(c));
      activeClass.forEach(c => navInventoryBtn.classList.add(c));
    }
    renderDashboardStats();
    renderInventoryTable();
  } else if (viewName === 'reports') {
    reportsSection.classList.remove('hidden');
    if (navReportsBtn) {
      inactiveClass.forEach(c => navReportsBtn.classList.remove(c));
      activeClass.forEach(c => navReportsBtn.classList.add(c));
    }
    renderReportsView();
  }
}

// ==========================================
// 4. ACTION HANDLERS
// ==========================================

function handleAddToCart(productId) {
  store.addToCart(productId, 1);
  updateCartBadge();
  renderCartDrawer();
  const product = store.products.find(p => p.id === productId);
  showToast(`"${product ? product.name : 'Produk'}" ditambahkan ke keranjang!`, 'success');
}

function handleCartQty(productId, delta) {
  store.updateCartQty(productId, delta);
  updateCartBadge();
  renderCartDrawer();
}

function handleCartRemove(productId) {
  store.removeFromCart(productId);
  updateCartBadge();
  renderCartDrawer();
  showToast('Item berhasil dihapus dari keranjang.', 'success');
}

function handleCategoryChange(category) {
  store.activeCategory = category;
  updateFilterUI();
}

function toggleBestSellerFilter() {
  store.bestSellerOnly = !store.bestSellerOnly;
  updateFilterUI();
}

function setSearch(term) {
  store.searchQuery = term;
  const input = document.getElementById('search-input');
  if (input) input.value = term;
  if (store.currentView && store.currentView !== 'catalog') switchView('catalog');
  renderProductGrid();
}

function doCatalogSearch() {
  const input = document.getElementById('search-input');
  const term = input ? input.value.trim() : '';
  store.searchQuery = term;
  if (store.currentView !== 'catalog') switchView('catalog');
  renderProductGrid();
}

function startFlashSaleCountdown() {
  const update = () => {
    const el = (id) => document.getElementById(id);
    const days = el('count-days');
    const hours = el('count-hours');
    const mins = el('count-min');
    const secs = el('count-sec');
    if (!hours || !secs || !mins || !days) return;

    let diff = new Date();
    const end = new Date(diff);
    end.setHours(23, 59, 59, 999);
    diff = Math.max(0, end - diff);

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    days.textContent = String(d).padStart(2, '0');
    hours.textContent = String(h).padStart(2, '0');
    mins.textContent = String(m).padStart(2, '0');
    secs.textContent = String(s).padStart(2, '0');
  };
  update();
  setInterval(update, 1000);
}

// Barcode scanning: triggered by scanner (keyboard-mode) Enter / button click
function handleBarcodeScan(input) {
  const code = (typeof input === 'string' ? input : (input && input.value) || '').trim();
  if (!code) {
    showToast('Silakan scan barcode atau ketik kode produk.', 'error');
    return;
  }

  const q = code.toLowerCase();
  const product = store.products.find(p =>
    (p.barcode && String(p.barcode).trim().toLowerCase() === q) ||
    String(p.id).toLowerCase() === q
  );

  if (!product) {
    openScanNotFoundModal(code);
    if (input && input.value !== undefined) { input.value = ''; }
    return;
  }

  if (input && input.value !== undefined) { input.value = ''; }
  openScanResultModal(product);
}

function openScanResultModal(product) {
  const modal = document.getElementById('scan-result-modal');
  const content = document.getElementById('scan-result-content');
  if (!modal || !content) return;

  let stockText, stockClass;
  if (product.stock === 0) { stockText = 'Habis'; stockClass = 'text-rose-600'; }
  else if (product.stock <= 10) { stockText = 'Menipis'; stockClass = 'text-amber-600'; }
  else { stockText = 'Tersedia'; stockClass = 'text-emerald-600'; }

  content.innerHTML = `
    <div class="text-center border-b border-slate-100 pb-4">
      <svg class="product-barcode mx-auto" data-barcode="${product.barcode || ''}" data-bwidth="1.5" data-bheight="40" width="150" height="40"></svg>
      <p class="text-[10px] font-mono text-slate-400 mt-1">Kode Barcode: ${product.barcode || '-'}</p>
    </div>

    <div class="flex items-start gap-3 mt-4">
      <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0"
        onerror="this.onerror=null; this.style.opacity='0.2';" />
      <div class="min-w-0">
        <p class="font-bold text-sm text-slate-800 line-clamp-2">${product.name}</p>
        <p class="text-[10px] text-slate-400 mt-0.5">${product.category} · ⭐ ${product.rating || '-'}</p>
        <p class="mt-2 text-lg font-black text-[#EE4D2D]">${formatIDR(product.price)}</p>
        <p class="text-[10px] font-medium text-slate-500">Stok: <span class="font-bold ${stockClass}">${product.stock} (${stockText})</span></p>
      </div>
    </div>

    <div class="flex gap-2 mt-5">
      <button onclick="handleAddToCart('${product.id}'); closeScanResultModal();"
        class="flex-1 py-2.5 rounded-lg bg-[#EE4D2D] hover:bg-[#d9471e] text-white font-bold text-xs transition-colors cursor-pointer shadow-md">
        🛒 Tambah ke Keranjang
      </button>
      <button onclick="switchView('inventory'); closeScanResultModal(); openEditProductModal('${product.id}');"
        class="px-4 py-2.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold text-xs transition-colors cursor-pointer">
        ✏️ Edit
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderBarcodes(content);
}

function closeScanResultModal() {
  const modal = document.getElementById('scan-result-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  const input = document.getElementById('barcode-scan-catalog');
  if (input) input.focus();
}

function openScanNotFoundModal(code) {
  const modal = document.getElementById('scan-result-modal');
  const content = document.getElementById('scan-result-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="text-center">
      <div class="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-2xl">🔍</div>
      <h4 class="font-extrabold text-slate-800 mt-3">Produk Tidak Ditemukan</h4>
      <p class="text-xs text-slate-500 mt-1">Barcode <span class="font-mono font-bold text-[#EE4D2D]">${code}</span> belum terdaftar pada produk manapun.</p>
      <p class="text-[10px] text-slate-400 mt-3 leading-relaxed">Tambahkan produk baru dengan barcode ini,<br/>atau edit produk yang sudah ada.</p>
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <button onclick="closeScanResultModal(); openAddProductModal('${code}');"
        class="w-full py-2.5 rounded-lg bg-[#EE4D2D] hover:bg-[#d9471e] text-white font-bold text-xs transition-colors cursor-pointer shadow-md">
        ➕ Tambah Produk Baru dengan Barcode Ini
      </button>
      <button onclick="closeScanResultModal(); switchView('inventory');"
        class="w-full py-2.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold text-xs transition-colors cursor-pointer">
        ✏️ Edit Produk di Dashboard
      </button>
      <button onclick="closeScanResultModal()"
        class="w-full py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs transition-colors cursor-pointer">
        Tutup
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// Barcode preview in product add/edit modal
function previewProductBarcode() {
  const code = (document.getElementById('product-barcode')?.value || '').trim();
  const preview = document.getElementById('product-barcode-preview');
  if (!preview) return;
  if (!code) {
    preview.classList.add('hidden');
    preview.innerHTML = '';
    return;
  }
  preview.classList.remove('hidden');
  preview.innerHTML = `<svg class="product-barcode" data-barcode="${code}" data-bwidth="1.5" data-bheight="42" width="170" height="42"></svg>`;
  renderBarcodes(preview);
}

function generateProductBarcode() {
  const input = document.getElementById('product-barcode');
  if (!input) return;
  input.value = generateUniqueBarcode();
  previewProductBarcode();
  showToast('Barcode baru berhasil dibuat otomatis.', 'success');
}

// Upload product image to Firebase Storage
async function uploadProductImage() {
  const fileInput = document.getElementById('product-image-file');
  const file = fileInput?.files?.[0];
  if (!file) { showToast('Pilih file gambar terlebih dahulu.', 'error'); return; }
  if (!file.type.startsWith('image/')) { showToast('File harus berupa gambar.', 'error'); return; }
  showToast('Mengunggah gambar...', 'success');
  try {
    const url = await store.uploadImage(file);
    document.getElementById('product-image').value = url;
    previewProductImage();
    showToast('Gambar berhasil diunggah!', 'success');
  } catch (e) {
    showToast('Gagal mengunggah gambar: ' + e.message, 'error');
  }
}

function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }
}

function openCheckoutModal() {
  if (store.cart.length === 0) {
    showToast('Keranjang Anda masih kosong!', 'error');
    return;
  }

  closeCartDrawer();

  // Populate order summary in checkout modal
  const checkoutSummary = document.getElementById('checkout-items-summary');
  const checkoutTotal = document.getElementById('checkout-total-price');

  if (checkoutSummary) {
    checkoutSummary.innerHTML = store.cart.map(item => `
      <div class="flex justify-between items-center text-xs py-1.5 border-b border-slate-100">
        <span class="font-medium text-slate-700 truncate max-w-[200px]">${item.name} (${item.quantity}x)</span>
        <span class="font-bold text-slate-900">${formatIDR(item.price * item.quantity)}</span>
      </div>
    `).join('');
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = formatIDR(store.getCartTotal());
  }

  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function processCheckout(e) {
  e.preventDefault();

  const nameInput = document.getElementById('checkout-name');
  const phoneInput = document.getElementById('checkout-phone');
  const addressInput = document.getElementById('checkout-address');
  const paymentInput = document.querySelector('input[name="payment-method"]:checked');

  if (!nameInput.value || !phoneInput.value || !addressInput.value) {
    showToast('Mohon lengkapi seluruh data pengiriman!', 'error');
    return;
  }

  const trxId = 'TRX-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

  const newTransaction = {
    id: trxId,
    date: new Date().toISOString(),
    customerName: nameInput.value,
    customerPhone: phoneInput.value,
    customerAddress: addressInput.value,
    items: [...store.cart],
    totalAmount: store.getCartTotal(),
    paymentMethod: paymentInput ? paymentInput.value : 'Transfer Bank (BCA)',
    status: 'Selesai'
  };

   store.addTransaction(newTransaction);
  store.clearCart();
  updateCartBadge();

  // Store last transaction ID for printing
  lastTransactionId = newTransaction.id;

  closeCheckoutModal();

  // Reset checkout form
  document.getElementById('checkout-form').reset();

  // Show Success Modal
  const successModal = document.getElementById('success-modal');
  const successTrxId = document.getElementById('success-trx-id');
  const successTotal = document.getElementById('success-total-amount');

  if (successTrxId) successTrxId.textContent = newTransaction.id;
  if (successTotal) successTotal.textContent = formatIDR(newTransaction.totalAmount);

  if (successModal) {
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
  }

  showToast('Transaksi Berhasil! Terima kasih atas pembelian Anda.', 'success');
}

function closeSuccessModal() {
  const successModal = document.getElementById('success-modal');
  if (successModal) {
    successModal.classList.add('hidden');
    successModal.classList.remove('flex');
  }
}

// ==========================================
// 6b. RECEIPT / STRUK PRINTING
// ==========================================

// Helper: Format date for receipt
function formatReceiptDate(dateISO) {
  return new Date(dateISO).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

// Generate receipt content (inner HTML only - for inline printing)
function generateReceiptContent(transaction) {
  const formattedDate = formatReceiptDate(transaction.date);

  const itemsRows = transaction.items.map(item => {
    const itemTotal = item.price * item.quantity;
    return `
      <tr class="receipt-item-row">
        <td class="receipt-item-name">${item.name} (${item.quantity}x)</td>
        <td class="receipt-item-price text-end">${formatIDR(item.price)}</td>
        <td class="receipt-item-qty text-end">${item.quantity}</td>
        <td class="receipt-item-total text-end">${formatIDR(itemTotal)}</td>
      </tr>
    `;
  }).join('');

  let subTotal = 0;
  transaction.items.forEach(item => {
    subTotal += item.price * item.quantity;
  });

  const tax = Math.round(subTotal * 0.11);
  const total = transaction.totalAmount;

  return `
  <div class="receipt-wrapper">
    <div class="receipt-header">
      <h2>NEXA MART</h2>
      <p>Future Interactive Marketplace</p>
    </div>

    <div class="receipt-body">
      <div class="receipt-info">
        <div><span>ID Transaksi:</span> ${transaction.id}</div>
        <div><span>Tanggal:</span> ${formattedDate}</div>
        <div><span>Status:</span> ✓ Selesai</div>
      </div>

      <div class="receipt-divider"></div>

      <p style="font-size:9px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:4px;">Pembeli</p>
      <div class="receipt-info">
        <div><span>Nama:</span> ${transaction.customerName}</div>
        <div><span>Telepon:</span> ${transaction.customerPhone}</div>
        <div style="margin-top:2px;"><span>Alamat:</span> ${transaction.customerAddress}</div>
      </div>

      <div class="receipt-divider"></div>

      <p style="font-size:9px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:4px;">Item Pemesanan</p>
      <table class="receipt-items" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th class="text-start">Produk</th>
            <th class="text-end">Harga</th>
            <th class="text-end">Qty</th>
            <th class="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <div class="receipt-summary">
        <div class="summary-row"><span class="label">Subtotal</span><span>${formatIDR(subTotal)}</span></div>
        <div class="summary-row"><span class="label">Pajak (11%)</span><span>${formatIDR(tax)}</span></div>
        <div class="summary-row final"><span class="label">Total Bayar</span><span>${formatIDR(total)}</span></div>
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-info">
        <div><span>Metode Pembayaran:</span> ${transaction.paymentMethod}</div>
      </div>
    </div>

    <div class="receipt-footer">
      <div class="thank-you">TERIMA KASIH TELAH BERBELANJA!</div>
      <div>Simpan struk ini sebagai bukti pembayaran.</div>
      <div style="margin-top:4px;">© 2026 daisyfumarket. Semua hak dilindungi.</div>
    </div>
  </div>

  <div class="no-print" style="text-align:center;margin-top:16px;">
    <button onclick="window.print()" style="padding:10px 20px;background:#0284c7;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">
      Cetak Ulang Struk
    </button>
  </div>
  `;
}

// Generate full receipt HTML document (for popup window)
function generateReceiptHTML(transaction) {
  const content = generateReceiptContent(transaction);
  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Struk Pembayaran - ${transaction.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 20mm;
    }
    .receipt-wrapper {
      max-width: 80mm;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      overflow: hidden;
    }
    .receipt-header {
      background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
      color: #fff;
      padding: 14px 16px;
      text-align: center;
    }
    .receipt-header h2 {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 1px;
    }
    .receipt-header p {
      font-size: 10px;
      opacity: 0.9;
      margin-top: 2px;
    }
    .receipt-body {
      padding: 14px 12px;
    }
    .receipt-info {
      font-size: 10.5px;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .receipt-info span {
      display: inline-block;
      font-weight: 600;
    }
    .receipt-divider {
      border-top: 1px dashed #cbd5e1;
      margin: 10px 0;
    }
    .receipt-items thead th {
      font-size: 9px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      padding: 4px 4px;
      border-bottom: 1px solid #e2e8f0;
    }
    .receipt-items tbody td {
      font-size: 9.5px;
      padding: 5px 4px;
      border-bottom: 0.5px solid #f1f5f9;
    }
    .receipt-items tbody tr:last-child td {
      border-bottom: none;
    }
    .receipt-item-name {
      width: 40%;
      font-weight: 600;
      color: #1e293b;
    }
    .receipt-summary {
      font-size: 10px;
      margin-top: 12px;
    }
    .receipt-summary .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;
      border-bottom: 0.5px solid #f1f5f9;
    }
    .receipt-summary .summary-row:last-child {
      border-bottom: 2px solid #0284c7;
    }
    .receipt-summary .summary-row.final {
      font-weight: 800;
      font-size: 11px;
      color: #0284c7;
    }
    .receipt-summary .label {
      color: #64748b;
    }
    .receipt-footer {
      text-align: center;
      padding: 12px;
      font-size: 9px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
    }
    .receipt-footer .thank-you {
      font-weight: 700;
      color: #0284c7;
      margin-bottom: 4px;
      font-size: 11px;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
  `;
}

// Print receipt for a given transaction
function printReceipt(transactionId) {
  const transaction = store.transactions.find(t => t.id === transactionId);
  if (!transaction) {
    showToast('Transaksi tidak ditemukan!', 'error');
    return;
  }

  const receiptFullHTML = generateReceiptHTML(transaction);
  const receiptContent = generateReceiptContent(transaction);

  // Try popup approach first (better UX with "Cetak Ulang" button)
  const printWindow = window.open('about:blank', '_blank', 'width=420,height=700');
  if (printWindow) {
    printWindow.document.write(receiptFullHTML);
    printWindow.document.close();
    printWindow.focus();

    let printed = false;
    const doPrint = () => {
      if (!printed && printWindow) {
        printed = true;
        printWindow.print();
      }
    };

    printWindow.onload = doPrint;
    setTimeout(doPrint, 500);
    return;
  }

  // Fallback: inject receipt into current page and print (popup blocked)
  showToast('Membuka halaman penuh untuk pencetakan...', 'success');

  let receiptContainer = document.getElementById('receipt-print-container');
  if (!receiptContainer) {
    receiptContainer = document.createElement('div');
    receiptContainer.id = 'receipt-print-container';
    receiptContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f8fafc;z-index:9999;padding:10mm;box-sizing:border-box;overflow-y:auto;';
    document.body.appendChild(receiptContainer);
  }
  receiptContainer.innerHTML = receiptContent;

  // Hide main content, show receipt
  const mainContent = document.querySelector('header, main, footer');
  if (mainContent) mainContent.style.display = 'none';

  setTimeout(() => {
    window.print();
  }, 100);

  // Restore after print dialog closes
  window.addEventListener('afterprint', () => {
    if (receiptContainer) receiptContainer.remove();
    if (mainContent) mainContent.style.display = '';
  }, { once: true });
}

// Store the last transaction ID for print-after-success
let lastTransactionId = null;

// Print receipt for the most recent transaction (used by success modal)
function printLastReceipt() {
  if (lastTransactionId) {
    printReceipt(lastTransactionId);
  } else {
    showToast('Tidak ada transaksi untuk dicetak.', 'error');
  }
}

// ==========================================
// 7. RESET DATA HELPER
// ==========================================

// Reset data helper for testing
function resetDemoData() {
  if (confirm('Apakah Anda yakin ingin mereset semua data demo ke kondisi awal? Data yang sudah ada akan hilang permanen.')) {
    if (!demoMode) {
      (async () => {
        try {
          const pSnap = await db.collection('products').get();
          const tSnap = await db.collection('transactions').get();
          const cSnap = await db.collection('carts').get();
          const batch = db.batch();
          pSnap.docs.forEach(d => batch.delete(d.ref));
          tSnap.docs.forEach(d => batch.delete(d.ref));
          cSnap.docs.forEach(d => batch.delete(d.ref));
          await batch.commit();
          for (const p of INITIAL_PRODUCTS) {
            const id = p.id || ('PRD-' + Date.now().toString().slice(-6).toUpperCase());
            await db.collection('products').doc(id).set({ ...p, id, barcode: makeEAN13('899' + String(parseInt(id.replace(/\D/g,''))||0).toString().padStart(9,'0')) });
          }
          for (const t of INITIAL_TRANSACTIONS) {
            await db.collection('transactions').add(t);
          }
        } catch (e) {
          showToast('Gagal mereset data cloud: ' + e.message, 'error');
        }
      })();
    }
    localStorage.removeItem('nexamart_cart');
    localStorage.removeItem('nexamart_transactions');
    localStorage.removeItem('nexamart_products');
    store.products = [...INITIAL_PRODUCTS];
    store.products.forEach((p, idx) => {
      if (!p.barcode) {
        const num = parseInt(String(p.id || '').replace(/\D/g, ''), 10) || idx + 1;
        p.barcode = makeEAN13('899' + String(num).padStart(9, '0'));
      }
    });
    store.cart = [];
    store.transactions = [...INITIAL_TRANSACTIONS];
    updateFilterUI();
    updateCartBadge();
    renderCartDrawer();
    renderProductGrid();
    renderReportsView();
    showToast('Data demo berhasil di-reset!', 'success');
  }
}

// ==========================================
// 8. INVENTORY DASHBOARD
// ==========================================

let inventoryPage = 1;
const inventoryPerPage = 10;
let deleteProductId = null;

// Render Dashboard Stats
function renderDashboardStats() {
  const products = store.products;
  const totalProducts = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const outStock = products.filter(p => p.stock === 0).length;
  const bestSellers = products.filter(p => p.isBestSeller).length;

  document.getElementById('dash-total-products').textContent = totalProducts;
  document.getElementById('dash-in-stock').textContent = inStock;
  document.getElementById('dash-out-stock').textContent = outStock;
  document.getElementById('dash-bestseller').textContent = bestSellers;
}

// Get Filtered Inventory Products
function getFilteredInventory() {
  const searchVal = (document.getElementById('inventory-search')?.value || '').toLowerCase().trim();
  const catFilter = document.getElementById('inventory-category-filter')?.value || 'Semua';
  const stockFilter = document.getElementById('inventory-stock-filter')?.value || 'Semua';

  return store.products.filter(p => {
    const matchSearch = !searchVal || p.name.toLowerCase().includes(searchVal) || p.category.toLowerCase().includes(searchVal);
    const matchCat = catFilter === 'Semua' || p.category === catFilter;
    
    let matchStock = true;
    if (stockFilter === 'available') matchStock = p.stock > 10;
    else if (stockFilter === 'low') matchStock = p.stock > 0 && p.stock <= 10;
    else if (stockFilter === 'empty') matchStock = p.stock === 0;

    return matchSearch && matchCat && matchStock;
  });
}

// Render Inventory Table
function renderInventoryTable() {
  const tbody = document.getElementById('inventory-table-body');
  const emptyState = document.getElementById('inventory-empty');
  const countEl = document.getElementById('inventory-count');
  if (!tbody) return;

  const filtered = getFilteredInventory();
  const totalPages = Math.ceil(filtered.length / inventoryPerPage);
  if (inventoryPage > totalPages) inventoryPage = totalPages || 1;

  const startIdx = (inventoryPage - 1) * inventoryPerPage;
  const pageItems = filtered.slice(startIdx, startIdx + inventoryPerPage);

  if (countEl) countEl.textContent = `${filtered.length} produk`;

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    renderPagination(filtered.length, 0, 0);
    return;
  }

  emptyState.classList.add('hidden');

  tbody.innerHTML = pageItems.map(product => {
    const stockStatus = product.stock === 0 
      ? '<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-100 text-rose-700 border border-rose-200">Habis</span>'
      : product.stock <= 10 
        ? '<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-700 border border-amber-200">Menipis</span>'
        : '<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Tersedia</span>';

    const bestSellerBadge = product.isBestSeller 
      ? '<span class="ml-1 text-[10px]">🔥</span>' 
      : '';

    return `
      <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 text-xs sm:text-sm">
        <td class="px-4 py-3">
          <input type="checkbox" class="product-checkbox accent-sky-500 cursor-pointer" value="${product.id}" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200" 
              onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e2e8f0%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%2240%22>📦</text></svg>';"
            />
            <div class="min-w-0">
              <p class="font-bold text-slate-800 truncate max-w-[200px]">${product.name}${bestSellerBadge}</p>
              <p class="text-[10px] text-slate-400 font-mono">${product.id}</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-center">
          <svg class="product-barcode inline-block" data-barcode="${product.barcode || ''}" data-bwidth="1" data-bheight="22" width="96" height="22"></svg>
          <p class="text-[9px] font-mono text-slate-400 mt-0.5">${product.barcode || '-'}</p>
        </td>
        <td class="px-4 py-3">
          <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-600 border border-slate-200">${product.category}</span>
        </td>
        <td class="px-4 py-3 text-right font-extrabold text-slate-900 whitespace-nowrap">${formatIDR(product.price)}</td>
        <td class="px-4 py-3 text-center">
          <span class="font-bold ${product.stock === 0 ? 'text-rose-600' : product.stock <= 10 ? 'text-amber-600' : 'text-slate-800'}">${product.stock}</span>
        </td>
        <td class="px-4 py-3 text-center">
          <span class="text-amber-500 font-bold">⭐ ${product.rating || '-'}</span>
        </td>
        <td class="px-4 py-3 text-center">${stockStatus}</td>
        <td class="px-4 py-3 text-center whitespace-nowrap">
          <div class="flex items-center justify-center gap-1">
            <button 
              onclick="openEditProductModal('${product.id}')"
              class="px-2 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 text-[10px] font-bold transition-colors cursor-pointer"
              title="Edit Produk"
            >
              ✏️ Edit
            </button>
            <button 
              onclick="openDeleteModal('${product.id}')"
              class="px-2 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-bold transition-colors cursor-pointer"
              title="Hapus Produk"
            >
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  renderBarcodes(tbody);
  renderPagination(filtered.length, startIdx + 1, Math.min(startIdx + inventoryPerPage, filtered.length));
}

// Render Pagination
function renderPagination(total, from, to) {
  const totalPages = Math.ceil(total / inventoryPerPage);
  const infoEl = document.getElementById('pagination-info');
  const totalEl = document.getElementById('pagination-total');
  const numbersEl = document.getElementById('pagination-numbers');
  const prevBtn = document.getElementById('btn-prev-page');
  const nextBtn = document.getElementById('btn-next-page');

  if (infoEl) infoEl.textContent = total > 0 ? `${from}-${to}` : '0';
  if (totalEl) totalEl.textContent = total;
  
  if (prevBtn) prevBtn.disabled = inventoryPage <= 1;
  if (nextBtn) nextBtn.disabled = inventoryPage >= totalPages;

  if (numbersEl) {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= inventoryPage - 1 && i <= inventoryPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    numbersEl.innerHTML = pages.map(p => {
      if (p === '...') return '<span class="px-1 text-xs text-slate-400">...</span>';
      const isActive = p === inventoryPage;
      return `<button onclick="goToInventoryPage(${p})" class="w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${isActive ? 'bg-sky-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}">${p}</button>`;
    }).join('');
  }
}

function prevInventoryPage() {
  if (inventoryPage > 1) {
    inventoryPage--;
    renderInventoryTable();
  }
}

function nextInventoryPage() {
  const totalPages = Math.ceil(getFilteredInventory().length / inventoryPerPage);
  if (inventoryPage < totalPages) {
    inventoryPage++;
    renderInventoryTable();
  }
}

function goToInventoryPage(page) {
  inventoryPage = page;
  renderInventoryTable();
}

function toggleSelectAll() {
  const selectAll = document.getElementById('select-all-products');
  const checkboxes = document.querySelectorAll('.product-checkbox');
  checkboxes.forEach(cb => cb.checked = selectAll.checked);
}

// ==========================================
// 8b. PRODUCT MODAL (ADD/EDIT)
// ==========================================

function openAddProductModal(presetBarcode) {
  document.getElementById('product-modal-title').textContent = 'Tambah Produk Baru';
  document.getElementById('product-submit-btn').innerHTML = '<span>💾</span> Simpan Produk';
  document.getElementById('product-form').reset();
  document.getElementById('product-edit-id').value = '';
  document.getElementById('product-image-preview').classList.add('hidden');
  const barcodeInput = document.getElementById('product-barcode');
  barcodeInput.value = (presetBarcode && /^\d{8,13}$/.test(String(presetBarcode)))
    ? String(presetBarcode)
    : generateUniqueBarcode();
  previewProductBarcode();
  
  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openEditProductModal(productId) {
  const product = store.getProductById(productId);
  if (!product) return;

  document.getElementById('product-modal-title').textContent = 'Edit Produk';
  document.getElementById('product-submit-btn').innerHTML = '<span>💾</span> Perbarui Produk';
  document.getElementById('product-edit-id').value = product.id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-description').value = product.description || '';
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-stock').value = product.stock;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-rating').value = product.rating || '';
  document.getElementById('product-bestseller').checked = product.isBestSeller || false;
  document.getElementById('product-image').value = product.image || '';
  document.getElementById('product-barcode').value = product.barcode || '';
  
  previewProductImage();
  previewProductBarcode();

  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function previewProductImage() {
  const url = document.getElementById('product-image').value;
  const preview = document.getElementById('product-image-preview');
  if (url && url.trim()) {
    preview.classList.remove('hidden');
    preview.querySelector('img').src = url;
  } else {
    preview.classList.add('hidden');
  }
}

function processProductSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('product-edit-id').value;
  const barcode = (document.getElementById('product-barcode').value || '').trim();

  if (!/^\d{8,13}$/.test(barcode)) {
    showToast('Barcode harus berupa 8-13 digit angka.', 'error');
    document.getElementById('product-barcode').focus();
    return;
  }

  const duplicate = store.products.find(p =>
    p.barcode === barcode && p.id !== editId
  );
  if (duplicate) {
    showToast(`Barcode ${barcode} sudah dipakai oleh "${duplicate.name}".`, 'error');
    return;
  }

  const productData = {
    name: document.getElementById('product-name').value.trim(),
    description: document.getElementById('product-description').value.trim(),
    category: document.getElementById('product-category').value,
    stock: parseInt(document.getElementById('product-stock').value) || 0,
    price: parseInt(document.getElementById('product-price').value) || 0,
    rating: parseFloat(document.getElementById('product-rating').value) || 4.5,
    isBestSeller: document.getElementById('product-bestseller').checked,
    image: document.getElementById('product-image').value.trim(),
    barcode: barcode,
    reviewsCount: 0
  };

  if (editId) {
    store.updateProduct({ id: editId, ...productData });
    showToast(`Produk "${productData.name}" berhasil diperbarui!`, 'success');
  } else {
    store.addProduct(productData);
    showToast(`Produk "${productData.name}" berhasil ditambahkan!`, 'success');
  }

  closeProductModal();
  renderInventoryTable();
  renderDashboardStats();
  renderProductGrid();
}

// ==========================================
// 8c. DELETE PRODUCT
// ==========================================

function openDeleteModal(productId) {
  deleteProductId = productId;
  const product = store.getProductById(productId);
  if (!product) return;

  document.getElementById('delete-product-name').textContent = `Anda yakin ingin menghapus "${product.name}"? Tindakan ini tidak dapat dibatalkan.`;
  
  const modal = document.getElementById('delete-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeDeleteModal() {
  deleteProductId = null;
  const modal = document.getElementById('delete-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function confirmDeleteProduct() {
  if (!deleteProductId) return;
  
  const product = store.getProductById(deleteProductId);
  store.deleteProduct(deleteProductId);
  
  closeDeleteModal();
  renderInventoryTable();
  renderDashboardStats();
  renderProductGrid();
  showToast(`Produk "${product?.name || 'Produk'}" berhasil dihapus!`, 'success');
}

// ==========================================
// 5. INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Auth form listeners
  const authForm = document.getElementById('auth-form');
  if (authForm) authForm.addEventListener('submit', handleAuthSubmit);
  const authSwitchLink = document.getElementById('auth-switch-link');
  if (authSwitchLink) authSwitchLink.addEventListener('click', (e) => { e.preventDefault(); toggleAuthMode(); });

  // Initial render
  updateFilterUI();
  updateCartBadge();
  startFlashSaleCountdown();
  renderProductGrid();
  renderInventoryTable();
  renderReportsView();

  // Search input listener
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      store.searchQuery = e.target.value;
      renderProductGrid();
    });
  }

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', processCheckout);
  }

  // Product Form Submission
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', processProductSubmit);
  }
});
