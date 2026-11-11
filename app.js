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
try {
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var auth = firebase.auth();
  var storage = firebase.storage();
} catch (e) {
  console.warn("Firebase init failed, running in offline/demo mode:", e);
  var db = null;
  var auth = null;
  var storage = null;
}

// ==========================================
// 1. DUMMY DATA PRODUCT CATALOG (16 ITEMS)
// ==========================================
const INITIAL_PRODUCTS = [
  {
    "id": "PRD-001",
    "name": "Boneka Teddy Bear Pastel Fluffy",
    "category": "Boneka & Plushie",
    "price": 95000,
    "rating": 4.9,
    "reviewsCount": 248,
    "isBestSeller": true,
    "image": "assets/toys/boneka-beruang.svg",
    "description": "Boneka beruang cokelat karamel super lembut, bahan velvet hypoallergenic aman untuk bayi dan anak.",
    "stock": 45
  },
  {
    "id": "PRD-002",
    "name": "Boneka Kelinci Pinkie Velvet Telinga Panjang",
    "category": "Boneka & Plushie",
    "price": 89000,
    "rating": 4.8,
    "reviewsCount": 195,
    "isBestSeller": true,
    "image": "assets/toys/boneka-kelinci.svg",
    "description": "Kelinci merah muda manis dengan telinga panjang empuk dan pita satin cantik di dada.",
    "stock": 50
  },
  {
    "id": "PRD-003",
    "name": "Boneka Kucing Meow Kitty Soft",
    "category": "Boneka & Plushie",
    "price": 78000,
    "rating": 4.7,
    "reviewsCount": 142,
    "isBestSeller": false,
    "image": "assets/toys/boneka-kucing.svg",
    "description": "Boneka anak kucing oranye ceria dengan mata bulat berbinar dan pipi bersemu merah muda.",
    "stock": 35
  },
  {
    "id": "PRD-004",
    "name": "Boneka Dino Mungil Minty Sahabat Cilik",
    "category": "Boneka & Plushie",
    "price": 82000,
    "rating": 4.9,
    "reviewsCount": 310,
    "isBestSeller": true,
    "image": "assets/toys/boneka-dino.svg",
    "description": "Dinosaurus hijau sage lucu dengan punggung bulat bergelombang dan senyum ramah yang menggemaskan.",
    "stock": 60
  },
  {
    "id": "PRD-005",
    "name": "Boneka Panda Boba Chubby Peluk Hangat",
    "category": "Boneka & Plushie",
    "price": 99000,
    "rating": 4.8,
    "reviewsCount": 180,
    "isBestSeller": false,
    "image": "assets/toys/boneka-panda.svg",
    "description": "Boneka panda bulat menggemaskan dengan perut empuk yang nyaman dipeluk saat tidur lelap.",
    "stock": 28
  },
  {
    "id": "PRD-006",
    "name": "Boneka Bebek Kuning Ducky Quack Quack",
    "category": "Boneka & Plushie",
    "price": 65000,
    "rating": 4.6,
    "reviewsCount": 95,
    "isBestSeller": false,
    "image": "assets/toys/boneka-bebek.svg",
    "description": "Anak bebek kuning cerah berparuh jingga lembut, favorit teman mandi dan teman bermain di kamar.",
    "stock": 40
  },
  {
    "id": "PRD-007",
    "name": "Boneka Unicorn Rainbow Tanduk Bintang Emas",
    "category": "Boneka & Plushie",
    "price": 125000,
    "rating": 5,
    "reviewsCount": 420,
    "isBestSeller": true,
    "image": "assets/toys/boneka-unicorn.svg",
    "description": "Unicorn putih magis dengan surai pelangi pastel dan tanduk emas berkilau impian setiap anak.",
    "stock": 32
  },
  {
    "id": "PRD-008",
    "name": "Barbie Princess Mahkota Bintang Emas",
    "category": "Barbie & Fashion Doll",
    "price": 185000,
    "rating": 4.9,
    "reviewsCount": 260,
    "isBestSeller": true,
    "image": "assets/toys/barbie-princess.svg",
    "description": "Boneka Barbie putri kerajaan bergaun pesta mekar bertabur mutiara dengan mahkota tiara berkilau.",
    "stock": 25
  },
  {
    "id": "PRD-009",
    "name": "Barbie Peri Sayap Kupu-Kupu Gemerlap",
    "category": "Barbie & Fashion Doll",
    "price": 165000,
    "rating": 4.8,
    "reviewsCount": 175,
    "isBestSeller": false,
    "image": "assets/toys/barbie-peri.svg",
    "description": "Boneka peri bersayap kupu-kupu transparan gradasi pelangi dengan tongkat sihir bintang mungil.",
    "stock": 30
  },
  {
    "id": "PRD-010",
    "name": "Barbie Pastry Chef Cilik & Set Kue Mini",
    "category": "Barbie & Fashion Doll",
    "price": 175000,
    "rating": 4.7,
    "reviewsCount": 130,
    "isBestSeller": false,
    "image": "assets/toys/barbie-chef.svg",
    "description": "Barbie koki berbakat lengkap dengan topi koki putih, celemek motif strawberry, dan nampan kue bolu.",
    "stock": 20
  },
  {
    "id": "PRD-011",
    "name": "Barbie Mermaid Putri Duyung Ekor Shimmer",
    "category": "Barbie & Fashion Doll",
    "price": 195000,
    "rating": 4.9,
    "reviewsCount": 340,
    "isBestSeller": true,
    "image": "assets/toys/barbie-mermaid.svg",
    "description": "Putri duyung cantik berekor sisik berkilau warna toska-ungu yang bisa berubah pantulan di dalam air.",
    "stock": 18
  },
  {
    "id": "PRD-012",
    "name": "Barbie Ballerina Gaun Tutu Pink Rose",
    "category": "Barbie & Fashion Doll",
    "price": 145000,
    "rating": 4.8,
    "reviewsCount": 110,
    "isBestSeller": false,
    "image": "assets/toys/barbie-ballerina.svg",
    "description": "Penari balet anggun dengan gaun tutu mekar tiga lapis pita dan sepatu balet satin bertali silang.",
    "stock": 24
  },
  {
    "id": "PRD-013",
    "name": "Barbie Fashionista Kacamata Retro Heart",
    "category": "Barbie & Fashion Doll",
    "price": 155000,
    "rating": 4.6,
    "reviewsCount": 92,
    "isBestSeller": false,
    "image": "assets/toys/barbie-fashionista.svg",
    "description": "Gaya modis terkini dengan kacamata hati merah muda, celana denim pastel, dan tas selempang chic.",
    "stock": 22
  },
  {
    "id": "PRD-014",
    "name": "Barbie Sisters Duo Set Gaun Pastel Kembar",
    "category": "Barbie & Fashion Doll",
    "price": 245000,
    "rating": 5,
    "reviewsCount": 388,
    "isBestSeller": true,
    "image": "assets/toys/barbie-sisters.svg",
    "description": "Set dua boneka kakak beradik kompak bergaun senada lengkap dengan pita rambut dan sandal manis.",
    "stock": 15
  },
  {
    "id": "PRD-015",
    "name": "Rumah Boneka Kayu Pastel 3 Lantai Lengkap",
    "category": "Rumah-rumahan & Miniatur",
    "price": 345000,
    "rating": 5,
    "reviewsCount": 512,
    "isBestSeller": true,
    "image": "assets/toys/rumah-kayu.svg",
    "description": "Dollhouse bertingkat 3 dengan balkon jendela kayu manis, pintu buka-tutup, dan tangga spiral mini.",
    "stock": 12
  },
  {
    "id": "PRD-016",
    "name": "Miniatur Toko Roti Sweet Bakery Cafe",
    "category": "Rumah-rumahan & Miniatur",
    "price": 285000,
    "rating": 4.9,
    "reviewsCount": 230,
    "isBestSeller": true,
    "image": "assets/toys/rumah-toko-roti.svg",
    "description": "Set pertokoan toko roti estetik dengan etalase kaca display croissant, meja kasir, dan tenda bergaris.",
    "stock": 16
  },
  {
    "id": "PRD-017",
    "name": "Istana Kastil Princess Merah Muda Megah",
    "category": "Rumah-rumahan & Miniatur",
    "price": 395000,
    "rating": 4.9,
    "reviewsCount": 340,
    "isBestSeller": true,
    "image": "assets/toys/rumah-istana.svg",
    "description": "Kastil megah dengan menara bendera berkibar, gerbang utama kerajaan, dan lampu miniatur yang menyala.",
    "stock": 10
  },
  {
    "id": "PRD-018",
    "name": "Miniatur Kamar Tidur Cozy Estetik Boneka",
    "category": "Rumah-rumahan & Miniatur",
    "price": 175000,
    "rating": 4.7,
    "reviewsCount": 88,
    "isBestSeller": false,
    "image": "assets/toys/rumah-kamar.svg",
    "description": "Set perabot kamar tidur mencakup ranjang kanopi busa empuk, bantal guling mini, dan meja belajar.",
    "stock": 25
  },
  {
    "id": "PRD-019",
    "name": "Rumah Pondok Jamur Peri Hutan Ajaib",
    "category": "Rumah-rumahan & Miniatur",
    "price": 220000,
    "rating": 4.8,
    "reviewsCount": 165,
    "isBestSeller": false,
    "image": "assets/toys/rumah-jamur.svg",
    "description": "Pondok mungil atap jamur polkadot merah lucu dengan pagar kayu kecil dan taman bunga mungil di depan.",
    "stock": 18
  },
  {
    "id": "PRD-020",
    "name": "Miniatur Dapur Koki Cilik Lengkap Oven & Kulkas",
    "category": "Rumah-rumahan & Miniatur",
    "price": 195000,
    "rating": 4.8,
    "reviewsCount": 145,
    "isBestSeller": false,
    "image": "assets/toys/rumah-dapur.svg",
    "description": "Kitchen set mini realistis berpintu oven buka-tutup, kompor simulasi putar, wajan, dan panci kecil.",
    "stock": 20
  },
  {
    "id": "PRD-021",
    "name": "Miniatur Villa Kolam Renang Mini Santai",
    "category": "Rumah-rumahan & Miniatur",
    "price": 320000,
    "rating": 4.9,
    "reviewsCount": 205,
    "isBestSeller": false,
    "image": "assets/toys/rumah-villa.svg",
    "description": "Villa modern dua lantai berpemandangan terbuka dengan area kolam renang mini dan kursi santai pantai.",
    "stock": 14
  },
  {
    "id": "PRD-022",
    "name": "Balok Kayu Susun Istana Pelangi 50 Pcs",
    "category": "Balok Susun & Edukasi",
    "price": 135000,
    "rating": 4.9,
    "reviewsCount": 380,
    "isBestSeller": true,
    "image": "assets/toys/balok-istana.svg",
    "description": "Set balok kayu natural dengan cat non-toxic warna pastel melatih imajinasi arsitektur si kecil.",
    "stock": 45
  },
  {
    "id": "PRD-023",
    "name": "Rainbow Stacker Lengkung Kayu Halus Waldorf",
    "category": "Balok Susun & Edukasi",
    "price": 115000,
    "rating": 4.8,
    "reviewsCount": 290,
    "isBestSeller": true,
    "image": "assets/toys/balok-rainbow.svg",
    "description": "Lengkungan pelangi kayu bertingkat 7 warna yang dapat disusun menjadi terowongan, jembatan, atau bunga.",
    "stock": 35
  },
  {
    "id": "PRD-024",
    "name": "Kereta Api Balok Angka Ceria Tarik Tali",
    "category": "Balok Susun & Edukasi",
    "price": 89000,
    "rating": 4.7,
    "reviewsCount": 120,
    "isBestSeller": false,
    "image": "assets/toys/balok-kereta.svg",
    "description": "Kereta api kayu dengan gerbong susun balok geometri angka penuh warna yang bisa ditarik berjalan.",
    "stock": 40
  },
  {
    "id": "PRD-025",
    "name": "Kotak Musik Putar & Balok Hewan Berputar Lucu",
    "category": "Balok Susun & Edukasi",
    "price": 145000,
    "rating": 4.9,
    "reviewsCount": 215,
    "isBestSeller": false,
    "image": "assets/toys/balok-musicbox.svg",
    "description": "Music box kayu mekanik dengan melodi klasik lembut nan menenangkan saat balok hewan berputar riang.",
    "stock": 22
  },
  {
    "id": "PRD-026",
    "name": "Puzzle Kayu Hewan Lucu Edukasi Balita",
    "category": "Balok Susun & Edukasi",
    "price": 55000,
    "rating": 4.8,
    "reviewsCount": 160,
    "isBestSeller": false,
    "image": "assets/toys/balok-puzzle.svg",
    "description": "Papan puzzle kayu bergagang pegangan pin kecil cocok untuk melatih motorik halus balita usia 1-4 tahun.",
    "stock": 50
  },
  {
    "id": "PRD-027",
    "name": "Set Teko & Cangkir Pesta Teh Keramik Mini",
    "category": "Pesta Teh & Aksesori",
    "price": 110000,
    "rating": 4.9,
    "reviewsCount": 310,
    "isBestSeller": true,
    "image": "assets/toys/pesta-teh.svg",
    "description": "Set teko teh motif bunga mawar manis dengan 4 cangkir kecil, tatakan piring, dan mangkuk gula susu.",
    "stock": 30
  },
  {
    "id": "PRD-028",
    "name": "Kereta Dorong Stroller Boneka Lipat Pastel",
    "category": "Pesta Teh & Aksesori",
    "price": 135000,
    "rating": 4.8,
    "reviewsCount": 195,
    "isBestSeller": false,
    "image": "assets/toys/stroller-boneka.svg",
    "description": "Stroller dorong boneka beroda empuk dengan kanopi lipat motif polkadot dan sabuk pengaman mungil.",
    "stock": 20
  },
  {
    "id": "PRD-029",
    "name": "Lemari Wardrobe Barbie & Koleksi Gaun Mini",
    "category": "Pesta Teh & Aksesori",
    "price": 160000,
    "rating": 4.8,
    "reviewsCount": 170,
    "isBestSeller": false,
    "image": "assets/toys/wardrobe-barbie.svg",
    "description": "Lemari pakaian portabel dengan gantungan baju mungil, rak sepatu, cermin dalam, dan handle jinjing.",
    "stock": 24
  },
  {
    "id": "PRD-030",
    "name": "Meja Rias Boneka dengan Cermin & Sisir Cantik",
    "category": "Pesta Teh & Aksesori",
    "price": 120000,
    "rating": 4.7,
    "reviewsCount": 105,
    "isBestSeller": false,
    "image": "assets/toys/meja-rias.svg",
    "description": "Meja rias cantik dengan cermin bentuk hati, laci perhiasan yang bisa ditarik, sisir, dan botol parfum mainan.",
    "stock": 28
  },
  {
    "id": "PRD-031",
    "name": "Ranjang Ayunan Bayi Boneka Kelambu Tidur Nyenyak",
    "category": "Pesta Teh & Aksesori",
    "price": 140000,
    "rating": 4.9,
    "reviewsCount": 220,
    "isBestSeller": true,
    "image": "assets/toys/ranjang-bayi.svg",
    "description": "Buaian ayunan ranjang tidur boneka bayi dengan tiang kelambu renda lembut dan kasur sprei bunga.",
    "stock": 18
  },
  {
    "id": "PRD-032",
    "name": "Koper Travel Mini Barbie & Paspor Mainan Petualang",
    "category": "Pesta Teh & Aksesori",
    "price": 95000,
    "rating": 4.8,
    "reviewsCount": 150,
    "isBestSeller": false,
    "image": "assets/toys/koper-travel.svg",
    "description": "Koper travel roda putar dengan pegangan teleskopik tarik, stiker dekorasi, dan kartu boarding pass mini.",
    "stock": 35
  }
];

// Seed Initial Transactions Sample Data
const INITIAL_TRANSACTIONS = [
  {
    "id": "TRX-20260806-001",
    "date": "2026-08-06T14:20:00.000Z",
    "customerName": "Budi Santoso",
    "customerPhone": "081234567890",
    "customerAddress": "Jl. Sudirman No. 45, Jakarta Selatan",
    "items": [
      {
        "id": "PRD-008",
        "name": "Barbie Princess Mahkota Bintang Emas",
        "price": 185000,
        "quantity": 1,
        "image": "assets/toys/barbie-princess.svg"
      },
      {
        "id": "PRD-012",
        "name": "Barbie Ballerina Gaun Tutu Pink Rose",
        "price": 145000,
        "quantity": 1,
        "image": "assets/toys/barbie-ballerina.svg"
      }
    ],
    "totalAmount": 330000,
    "paymentMethod": "Transfer Bank (BCA)",
    "status": "Selesai"
  },
  {
    "id": "TRX-20260806-002",
    "date": "2026-08-06T16:45:00.000Z",
    "customerName": "Siti Rahmawati",
    "customerPhone": "085712345678",
    "customerAddress": "Jl. Dago Atas No. 12, Bandung",
    "items": [
      {
        "id": "PRD-015",
        "name": "Rumah Boneka Kayu Pastel 3 Lantai Lengkap",
        "price": 345000,
        "quantity": 1,
        "image": "assets/toys/rumah-kayu.svg"
      },
      {
        "id": "PRD-002",
        "name": "Boneka Kelinci Pinkie Velvet Telinga Panjang",
        "price": 89000,
        "quantity": 2,
        "image": "assets/toys/boneka-kelinci.svg"
      }
    ],
    "totalAmount": 523000,
    "paymentMethod": "E-Wallet (Gopay)",
    "status": "Selesai"
  },
  {
    "id": "TRX-20260807-003",
    "date": "2026-08-07T09:15:00.000Z",
    "customerName": "Rian Hidayat",
    "customerPhone": "087899887766",
    "customerAddress": "Jl. Malioboro No. 88, Yogyakarta",
    "items": [
      {
        "id": "PRD-001",
        "name": "Boneka Teddy Bear Pastel Fluffy",
        "price": 95000,
        "quantity": 2,
        "image": "assets/toys/boneka-beruang.svg"
      },
      {
        "id": "PRD-027",
        "name": "Set Teko & Cangkir Pesta Teh Keramik Mini",
        "price": 110000,
        "quantity": 1,
        "image": "assets/toys/pesta-teh.svg"
      }
    ],
    "totalAmount": 300000,
    "paymentMethod": "Cash on Delivery (COD)",
    "status": "Selesai"
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
    this.accounts = [];
    this.uid = null;
    this.activeCategory = 'Semua';
    this.searchQuery = '';
    this.bestSellerOnly = false;
    this.currentView = 'catalog';

    if (!auth || !auth.onAuthStateChanged) return;
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
        this.accounts = [];
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
    if (!this.uid) return;
    try {
      const snap = await db.collection('products').get();
      if (snap.empty) {
        let local = JSON.parse(localStorage.getItem('nexamart_products')) || [...INITIAL_PRODUCTS];
        if (Array.isArray(local) && local.length > 0 && (!local[0].image || !local[0].image.includes('assets/toys/'))) {
          local = [...INITIAL_PRODUCTS];
          localStorage.removeItem('nexamart_products');
        }
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
      let local = JSON.parse(localStorage.getItem('nexamart_products')) || [...INITIAL_PRODUCTS];
      if (Array.isArray(local) && local.length > 0 && (!local[0].image || !local[0].image.includes('assets/toys/'))) {
        local = [...INITIAL_PRODUCTS];
        localStorage.removeItem('nexamart_products');
      }
      this.products = local;
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
    if (demoMode) {
      try { localStorage.setItem('nexamart_products', JSON.stringify(this.products)); } catch (e) {
        if (e.name === 'QuotaExceededError') {
          showToast('Storage penuh! Hapus produk lama atau gunakan gambar lebih kecil.', 'error');
        }
      }
    }
    try { await db.collection('products').doc(id).set(product); } catch (e) { showToast('Gagal menyimpan produk ke cloud: ' + e.message, 'error'); }
    renderProductGrid(); renderInventoryTable(); renderDashboardStats();
  }

  async updateProduct(updatedProduct) {
    const idx = this.products.findIndex(p => p.id === updatedProduct.id);
    if (idx > -1) this.products[idx] = { ...this.products[idx], ...updatedProduct };
    if (demoMode) {
      try { localStorage.setItem('nexamart_products', JSON.stringify(this.products)); } catch (e) {
        if (e.name === 'QuotaExceededError') {
          showToast('Storage penuh! Hapus produk lama atau gunakan gambar lebih kecil.', 'error');
        }
      }
    }
    try { await db.collection('products').doc(updatedProduct.id).set(updatedProduct, { merge: true }); } catch (e) { showToast('Gagal memperbarui produk: ' + e.message, 'error'); }
    renderProductGrid(); renderInventoryTable(); renderDashboardStats();
  }

  async deleteProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
    if (demoMode) {
      try { localStorage.setItem('nexamart_products', JSON.stringify(this.products)); } catch (e) {
        if (e.name === 'QuotaExceededError') {
          showToast('Storage penuh!', 'error');
        }
      }
    }
    try { await db.collection('products').doc(productId).delete(); } catch (e) { showToast('Gagal menghapus produk: ' + e.message, 'error'); }
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
    this.products.forEach(p => { db.collection('products').doc(p.id).set(p).catch(() => {}); });
  }

  async loadCart() {
    if (!this.uid) return;
    try { const snap = await db.collection('carts').doc(this.uid).get(); this.cart = snap.exists() ? (snap.data().items || []) : []; } catch (e) { this.cart = []; }
    updateCartBadge(); renderCartDrawer();
  }

  saveCart() { if (!this.uid) return; db.collection('carts').doc(this.uid).set({ items: this.cart }).catch(() => {}); }

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
    if (!this.uid) return;
    try { const snap = await db.collection('transactions').get(); this.transactions = snap.docs.map(d => ({ id: d.id, ...d.data() })); } catch (e) { this.transactions = []; }
  }

  async addTransaction(transactionData) {
    try { await db.collection('transactions').add(transactionData); } catch (e) { showToast('Gagal menyimpan transaksi: ' + e.message, 'error'); }
    await this.loadTransactions();
  }

  async clearAllTransactions() {
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
  try {
    const saved = JSON.parse(localStorage.getItem('nexamart_products') || 'null');
    const isOldCatalog = Array.isArray(saved) && saved.length > 0 && (!saved[0].image || !saved[0].image.includes('assets/toys/'));
    if (isOldCatalog) {
      localStorage.removeItem('nexamart_products');
      store.products = [...INITIAL_PRODUCTS];
    } else {
      store.products = saved || [...INITIAL_PRODUCTS];
    }
  } catch (e) {
    console.error('Failed to load products from localStorage:', e);
    store.products = [...INITIAL_PRODUCTS];
  }
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
      const cred = await auth.signInWithEmailAndPassword(email, password);
      // Cek apakah akun dinonaktifkan (best-effort; gagal baca tidak memblokir login)
      try {
        const doc = await db.collection('users').doc(cred.user.uid).get();
        if (doc.exists && doc.data().isActive === false) {
          await auth.signOut();
          throw new Error('Akun Anda telah dinonaktifkan. Hubungi admin toko.');
        }
      } catch (e) {
        if (String(e.message).includes('dinonaktifkan')) throw e;
        // Abaikan error baca (mis. Firestore rules) agar login tidak terblokir
      }
    } else {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      try {
        await db.collection('users').doc(cred.user.uid).set({
          uid: cred.user.uid,
          email: email,
          displayName: name,
          role: 'staff',
          isActive: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) {
        // Jangan gagalkan registrasi hanya karena gagal menulis profil akun
        console.warn('Gagal menyimpan profil akun:', e);
      }
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
    store.accounts = [];
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
  toast.className = `flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-soft text-xs sm:text-sm font-extrabold toast-enter ${
    isSuccess ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-btn' : 'bg-rose-500 text-white shadow-card'
  }`;

  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
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
    <div class="card-cute product-card overflow-hidden flex flex-col group cursor-pointer bg-white rounded-3xl shadow-card hover:shadow-soft transition-all duration-300">
      <!-- Image -->
      <div class="relative aspect-square overflow-hidden bg-cream-100 rounded-t-3xl">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onerror="this.onerror=null; this.src='${fallback}';"
        />
        <div class="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          ${product.isBestSeller ? `<span class="px-2.5 py-1 text-[10px] font-black rounded-full bg-gradient-to-r from-coral-500 to-amber-400 text-white shadow-md flex items-center gap-1">🔥 Best</span>` : ''}
          <span class="px-2.5 py-0.5 text-[9px] font-extrabold rounded-full bg-white/95 text-caramel-700 shadow-sm backdrop-blur">${product.category}</span>
        </div>
        <button 
          onclick="openEditProductModal('${product.id}')"
          class="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-xs text-caramel-700 hover:text-coral-600 hover:scale-110 transition-transform cursor-pointer"
          title="Edit Produk"
        >✏️</button>
      </div>

      <!-- Body -->
      <div class="p-3.5 flex flex-col flex-1">
        <h3 class="font-display text-[13px] font-bold text-caramel-900 line-clamp-2 leading-snug group-hover:text-coral-600 transition-colors">
          ${product.name}
        </h3>

        <div class="flex items-center gap-1.5 mt-1.5 text-[11px]">
          <span class="text-amber-500 font-black">⭐ ${product.rating}</span>
          <span class="text-caramel-500 font-semibold">· Terjual ${product.reviewsCount}</span>
        </div>

        <div class="mt-2">
          <span class="font-display text-[17px] font-black text-coral-600">${formatIDR(product.price)}</span>
        </div>

        <div class="mt-2 flex items-center justify-between border-t-2 border-dashed border-cream-200 pt-2">
          <svg class="product-barcode" data-barcode="${product.barcode || ''}" data-bwidth="1" data-bheight="14" width="72" height="14"></svg>
          <span class="text-[9px] font-mono text-caramel-500 font-bold tracking-tight">${product.barcode || '-'}</span>
        </div>

        <div class="mt-auto pt-2.5 flex items-center justify-between gap-1">
          <span class="text-[10px] font-bold text-caramel-500">Stok: ${product.stock}</span>
          <button 
            onclick="handleAddToCart('${product.id}')"
            class="btn-cute px-3 py-1.5 text-xs rounded-2xl"
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
    <div class="flex items-center gap-3 p-3.5 bg-white rounded-2xl border-2 border-cream-200 shadow-sm hover:border-coral-400/40 transition-colors">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl bg-cream-100 flex-shrink-0 shadow-inner" />
      <div class="flex-1 min-w-0">
        <h4 class="font-display font-bold text-xs sm:text-sm text-caramel-900 truncate">${item.name}</h4>
        <span class="text-xs font-black text-coral-600 block mt-0.5">${formatIDR(item.price)}</span>
        
        <div class="flex items-center gap-2 mt-2">
          <div class="flex items-center border border-cream-300 rounded-xl overflow-hidden bg-cream-100 shadow-inner">
            <button 
              onclick="handleCartQty('${item.id}', -1)"
              class="px-2.5 py-1 text-caramel-700 hover:bg-cream-200 text-xs font-black transition-colors"
            >-</button>
            <span class="px-3 py-1 text-xs font-black text-caramel-900">${item.quantity}</span>
            <button 
              onclick="handleCartQty('${item.id}', 1)"
              class="px-2.5 py-1 text-caramel-700 hover:bg-cream-200 text-xs font-black transition-colors"
            >+</button>
          </div>

          <button 
            onclick="handleCartRemove('${item.id}')" 
            class="text-xs text-rose-500 hover:text-rose-600 font-extrabold ml-auto transition-colors cursor-pointer"
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

  // Render Grouped-by-Day Report
  const container = document.getElementById('reports-by-day');
  const reportsEmpty = document.getElementById('reports-empty');

  if (!container) return;

  if (transactions.length === 0) {
    container.innerHTML = '';
    if (reportsEmpty) reportsEmpty.classList.remove('hidden');
    return;
  }

  if (reportsEmpty) reportsEmpty.classList.add('hidden');

  // Group transactions by local calendar day (key: YYYY-MM-DD)
  const groupsMap = new Map();
  transactions.forEach(t => {
    const d = new Date(t.date);
    if (isNaN(d)) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, { date: new Date(d.getFullYear(), d.getMonth(), d.getDate()), items: [], total: 0 });
    }
    const g = groupsMap.get(key);
    g.items.push(t);
    g.total += t.totalAmount || 0;
  });

  const groups = [...groupsMap.values()].sort((a, b) => b.date - a.date);
  groups.forEach(g => g.items.sort((a, b) => new Date(b.date) - new Date(a.date)));

  container.innerHTML = groups.map(group => {
    const dayTitle = group.date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const rows = group.items.map(trx => {
      const timeText = new Date(trx.date).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const itemsSummary = trx.items.map(i => `${i.name} (${i.quantity}x)`).join(', ');

      return `
        <tr class="hover:bg-cream-100 transition-colors border-b border-cream-200 text-xs sm:text-sm">
          <td class="px-4 py-3.5 font-mono font-bold text-coral-600">${trx.id}</td>
          <td class="px-4 py-3.5 text-caramel-500 whitespace-nowrap font-mono font-semibold">${timeText}</td>
          <td class="px-4 py-3.5 font-bold text-caramel-900">
            <div>${trx.customerName}</div>
            <div class="text-xs text-caramel-500 font-semibold truncate max-w-xs">${trx.customerAddress}</div>
          </td>
          <td class="px-4 py-3.5 text-caramel-700 font-medium max-w-xs truncate" title="${itemsSummary}">
            ${itemsSummary}
          </td>
          <td class="px-4 py-3.5 font-black text-caramel-900 font-display whitespace-nowrap">${formatIDR(trx.totalAmount)}</td>
          <td class="px-4 py-3.5 whitespace-nowrap">
            <span class="px-3 py-1 text-[11px] font-black rounded-full bg-sage-500/20 text-sage-600 border border-sage-500/30">
              ✓ ${trx.status}
            </span>
          </td>
           <td class="px-4 py-3.5 text-caramel-700 font-semibold whitespace-nowrap">${trx.paymentMethod}</td>
           <td class="px-4 py-3.5 text-center whitespace-nowrap">
             <button
               onclick="printReceipt('${trx.id}')"
               class="px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-caramel-800 font-extrabold text-xs transition-colors inline-flex items-center justify-center gap-1 shadow-sm cursor-pointer border border-amber-200/60"
               title="Cetak Struk ${trx.id}"
             >
               🖨️
             </button>
           </td>
         </tr>
      `;
    }).join('');

    return `
      <div class="card-cute overflow-hidden bg-white mb-4">
        <div class="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-dashed border-cream-200 bg-gradient-to-r from-cream-100 via-cream-50 to-cream-100">
          <div>
            <h4 class="font-display font-bold text-caramel-900 text-base sm:text-lg flex items-center gap-2"><span class="text-coral-600">📅</span> ${dayTitle}</h4>
            <p class="text-[11px] text-caramel-500 font-semibold mt-0.5">${group.items.length} transaksi pada hari ini</p>
          </div>
          <div class="text-left sm:text-right">
            <span class="text-[9px] uppercase tracking-wider text-caramel-500 font-black">Total Hari Ini</span>
            <div class="text-base sm:text-lg font-black text-coral-600 font-display">${formatIDR(group.total)}</div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr class="bg-cream-100 border-b-2 border-cream-200 text-[10px] uppercase tracking-wider font-black text-caramel-500">
                <th class="px-4 py-3.5">ID Transaksi</th>
                <th class="px-4 py-3.5">Waktu</th>
                <th class="px-4 py-3.5">Nama & Alamat Pembeli</th>
                <th class="px-4 py-3.5">Item Dibeli</th>
                <th class="px-4 py-3.5">Total Bayar</th>
                <th class="px-4 py-3.5">Status</th>
                <th class="px-4 py-3.5">Metode Pembayaran</th>
                <th class="px-4 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }).join('');
}

// Category Pills Renderer
function renderCategoryPills() {
  const container = document.getElementById('category-pills');
  if (!container) return;

  const categories = [
    'Semua',
    'Boneka & Plushie',
    'Barbie & Fashion Doll',
    'Rumah-rumahan & Miniatur',
    'Balok Susun & Edukasi',
    'Pesta Teh & Aksesori'
  ];

  container.innerHTML = categories.map(cat => {
    const isActive = store.activeCategory === cat;
    return `
      <button 
        onclick="handleCategoryChange('${cat}')"
        class="chip px-4 py-2 text-[13px] font-extrabold transition-all whitespace-nowrap cursor-pointer ${
          isActive 
            ? 'chip-active !bg-coral-500 !text-white shadow-btn' 
            : 'bg-white text-caramel-700 hover:bg-cream-100 border border-cream-300'
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
      bestSellerBtn.classList.remove('bg-white', 'text-coral-600', 'border-coral-400/40');
      bestSellerBtn.classList.add('!bg-coral-500', '!text-white', '!border-coral-500', 'shadow-btn');
    } else {
      bestSellerBtn.classList.add('bg-white', 'text-coral-600', 'border-coral-400/40');
      bestSellerBtn.classList.remove('!bg-coral-500', '!text-white', '!border-coral-500', 'shadow-btn');
    }
  }

  const catBestBtn = document.getElementById('cat-bestseller-btn');
  if (catBestBtn) {
    if (store.bestSellerOnly) {
      catBestBtn.classList.remove('text-amber-700', 'bg-amber-100');
      catBestBtn.classList.add('!bg-amber-500', '!text-white', 'shadow-btn');
    } else {
      catBestBtn.classList.add('text-amber-700', 'bg-amber-100');
      catBestBtn.classList.remove('!bg-amber-500', '!text-white', 'shadow-btn');
    }
  }

  renderProductGrid();
}

// Switch Views
function switchView(viewName) {
  if (typeof closeNavDrawer === 'function') closeNavDrawer();
  store.currentView = viewName;
  const dashboardSection = document.getElementById('dashboard-section');
  const catalogSection = document.getElementById('catalog-section');
  const reportsSection = document.getElementById('reports-section');
  const inventorySection = document.getElementById('inventory-section');
  const akunSection = document.getElementById('akun-section');
  const navDashboardBtn = document.getElementById('nav-btn-dashboard');
  const navCatalogBtn = document.getElementById('nav-btn-catalog');
  const navReportsBtn = document.getElementById('nav-btn-reports');
  const navInventoryBtn = document.getElementById('nav-btn-inventory');
  const navAkunBtn = document.getElementById('nav-btn-akun');

  // Check admin permission if accessing dashboard
  if (viewName === 'dashboard' && !isCurrentUserAdmin()) {
    showToast('Akses ditolak: Hanya admin yang dapat mengakses Dashboard!', 'error');
    switchView('catalog');
    return;
  }

  // Hide all sections
  if (dashboardSection) dashboardSection.classList.add('hidden');
  if (catalogSection) catalogSection.classList.add('hidden');
  if (reportsSection) reportsSection.classList.add('hidden');
  if (inventorySection) inventorySection.classList.add('hidden');
  if (akunSection) akunSection.classList.add('hidden');

  // Reset nav buttons
  const activeClass = ['text-coral-600', 'bg-coral-400/20'];
  const inactiveClass = ['text-caramel-500', 'bg-transparent'];
  [navDashboardBtn, navCatalogBtn, navReportsBtn, navInventoryBtn, navAkunBtn].forEach(btn => {
    if (btn) {
      activeClass.forEach(c => btn.classList.remove(c));
      inactiveClass.forEach(c => btn.classList.add(c));
    }
  });

  if (viewName === 'dashboard') {
    if (dashboardSection) dashboardSection.classList.remove('hidden');
    if (navDashboardBtn) {
      inactiveClass.forEach(c => navDashboardBtn.classList.remove(c));
      activeClass.forEach(c => navDashboardBtn.classList.add(c));
    }
    renderAdminDashboard();
  } else if (viewName === 'catalog') {
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
  } else if (viewName === 'akun') {
    if (akunSection) akunSection.classList.remove('hidden');
    if (navAkunBtn) {
      inactiveClass.forEach(c => navAkunBtn.classList.remove(c));
      activeClass.forEach(c => navAkunBtn.classList.add(c));
    }
    loadAccounts();
    renderAccountsTable();
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
  if (product.stock === 0) { stockText = 'Habis'; stockClass = 'text-rose-600 font-black'; }
  else if (product.stock <= 10) { stockText = 'Menipis'; stockClass = 'text-amber-600 font-black'; }
  else { stockText = 'Tersedia'; stockClass = 'text-sage-600 font-black'; }

  content.innerHTML = `
    <div class="text-center border-b-2 border-dashed border-cream-200 pb-4">
      <svg class="product-barcode mx-auto" data-barcode="${product.barcode || ''}" data-bwidth="1.5" data-bheight="40" width="150" height="40"></svg>
      <p class="text-[10px] font-mono text-caramel-500 font-bold mt-1">Kode Barcode: ${product.barcode || '-'}</p>
    </div>

    <div class="flex items-start gap-3 mt-4">
      <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-2xl bg-cream-100 border border-cream-200 flex-shrink-0 shadow-inner"
        onerror="this.onerror=null; this.style.opacity='0.2';" />
      <div class="min-w-0">
        <p class="font-display font-bold text-sm text-caramel-900 line-clamp-2">${product.name}</p>
        <p class="text-[10px] text-caramel-500 font-semibold mt-0.5">${product.category} · ⭐ ${product.rating || '-'}</p>
        <p class="mt-2 text-xl font-black text-coral-600 font-display">${formatIDR(product.price)}</p>
        <p class="text-[10px] font-bold text-caramel-700">Stok: <span class="${stockClass}">${product.stock} (${stockText})</span></p>
      </div>
    </div>

    <div class="flex gap-2 mt-5">
      <button onclick="handleAddToCart('${product.id}'); closeScanResultModal();"
        class="btn-cute flex-1 py-3 text-xs">
        🛒 + Keranjang
      </button>
      <button onclick="switchView('inventory'); closeScanResultModal(); openEditProductModal('${product.id}');"
        class="btn-cream px-4 py-3 text-xs">
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
      <div class="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl shadow-inner">🔍</div>
      <h4 class="font-display font-bold text-lg text-caramel-900 mt-3">Produk Tidak Ditemukan</h4>
      <p class="text-xs text-caramel-500 font-semibold mt-1">Barcode <span class="font-mono font-bold text-coral-600">${code}</span> belum terdaftar pada produk manapun.</p>
      <p class="text-[10px] text-caramel-500 font-medium mt-3 leading-relaxed">Tambahkan produk baru dengan barcode ini,<br/>atau edit produk yang sudah ada.</p>
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <button onclick="closeScanResultModal(); openAddProductModal('${code}');"
        class="btn-cute w-full py-3 text-xs">
        ➕ Tambah Produk Baru dengan Barcode Ini
      </button>
      <button onclick="closeScanResultModal(); switchView('inventory');"
        class="btn-cream w-full py-3 text-xs">
        📦 Lihat Dashboard Produk
      </button>
      <button onclick="closeScanResultModal()"
        class="w-full py-2.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-caramel-700 font-extrabold text-xs transition-colors cursor-pointer">
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

// Upload product image (Firebase Storage if logged in, compressed Base64 for demo/offline)
function compressImage(file, maxWidth = 300, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Gagal memuat gambar'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
    reader.readAsDataURL(file);
  });
}

async function uploadProductImage() {
  const fileInput = document.getElementById('product-image-file');
  const file = fileInput?.files?.[0];
  if (!file) { showToast('Pilih file gambar terlebih dahulu.', 'error'); return; }
  if (!file.type.startsWith('image/')) { showToast('File harus berupa gambar.', 'error'); return; }
  if (file.size > 5 * 1024 * 1024) { showToast('Ukuran gambar maksimal 5MB.', 'error'); return; }
  showToast('Mengompres & mengunggah gambar...', 'success');
  try {
    let imageData;
    if (store.uid && store.uid !== 'demo') {
      imageData = await store.uploadImage(file);
    } else {
      imageData = await compressImage(file);
    }
    document.getElementById('product-image').value = imageData;
    previewProductImage();
    fileInput.value = ''; // Reset file input
    showToast('Gambar berhasil diunggah!', 'success');
  } catch (e) {
    showToast('Gagal mengunggah gambar: ' + e.message, 'error');
  }
}

// Auto upload saat pilih file (tanpa perlu klik tombol)
function handleProductFileSelect(input) {
  const file = input?.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast('File harus berupa gambar.', 'error'); input.value = ''; return; }
  if (file.size > 5 * 1024 * 1024) { showToast('Ukuran gambar maksimal 5MB.', 'error'); input.value = ''; return; }
  showToast('Mengompres & memproses gambar...', 'success');
  compressImage(file).then(imageData => {
    document.getElementById('product-image').value = imageData;
    previewProductImage();
    input.value = ''; // Reset
    showToast('Gambar siap digunakan!', 'success');
  }).catch(e => {
    showToast('Gagal memproses gambar: ' + e.message, 'error');
    input.value = '';
  });
}

function isCurrentUserAdmin() {
  if (demoMode || store.isDemo) {
    return true; // Mode demo berjalan sebagai admin penuh
  }
  const user = auth && auth.currentUser;
  if (!user) return false;
  const acc = store.accounts.find(a => a.uid === user.uid || a.email === user.email || a.id === user.uid);
  if (acc) {
    return acc.role === 'admin';
  }
  return true; // Default admin untuk pengguna awal
}

function updateNavDrawerAccess() {
  const isAdmin = isCurrentUserAdmin();
  const dashBtn = document.getElementById('nav-btn-dashboard');
  if (dashBtn) {
    if (isAdmin) {
      dashBtn.classList.remove('hidden');
    } else {
      dashBtn.classList.add('hidden');
    }
  }
}

function renderAdminDashboard() {
  const revEl = document.getElementById('admin-dash-revenue');
  const ordEl = document.getElementById('admin-dash-orders');
  const prodEl = document.getElementById('admin-dash-products');
  const critEl = document.getElementById('admin-dash-critical');
  const recentTxContainer = document.getElementById('admin-dash-recent-tx');
  const lowStockContainer = document.getElementById('admin-dash-low-stock');

  const totalRev = store.transactions.reduce((sum, t) => sum + (Number(t.total) || 0), 0);
  const totalOrders = store.transactions.length;
  const totalProds = store.products.length;
  const criticalItems = store.products.filter(p => Number(p.stock) <= 5);

  if (revEl) revEl.textContent = formatIDR(totalRev);
  if (ordEl) ordEl.textContent = `${totalOrders} pesanan`;
  if (prodEl) prodEl.textContent = `${totalProds} produk`;
  if (critEl) critEl.textContent = `${criticalItems.length} item`;

  // Render 5 transaksi terbaru
  if (recentTxContainer) {
    if (store.transactions.length === 0) {
      recentTxContainer.innerHTML = '<div class="text-center py-6 text-caramel-500 font-semibold text-xs">Belum ada transaksi tercatat.</div>';
    } else {
      const recent = [...store.transactions].slice(0, 5);
      recentTxContainer.innerHTML = recent.map(tx => {
        const dateStr = tx.date ? new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';
        const itemCount = Array.isArray(tx.items) ? tx.items.reduce((sum, i) => sum + (i.quantity || 1), 0) : 1;
        return `
          <div class="flex items-center justify-between p-3 rounded-2xl bg-cream-50 hover:bg-cream-100 transition-colors">
            <div class="flex items-center gap-3 min-w-0">
              <span class="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-sm shadow-sm flex-shrink-0">🛍️</span>
              <div class="min-w-0">
                <p class="font-display font-bold text-xs text-caramel-900 truncate">${tx.customerName || 'Pelanggan Toko'}</p>
                <p class="text-[10px] text-caramel-500 font-semibold">${dateStr} • ${itemCount} barang</p>
              </div>
            </div>
            <div class="text-right flex-shrink-0 pl-2">
              <p class="font-black text-coral-600 text-xs">${formatIDR(tx.total)}</p>
              <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Lunas</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Render produk stok kritis
  if (lowStockContainer) {
    if (criticalItems.length === 0) {
      lowStockContainer.innerHTML = '<div class="text-center py-6 text-sage-600 font-bold text-xs bg-cream-50 rounded-2xl">✅ Semua stok aman terkendali!</div>';
    } else {
      lowStockContainer.innerHTML = criticalItems.slice(0, 5).map(p => {
        const isOut = Number(p.stock) === 0;
        const badgeColor = isOut ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-700';
        const badgeText = isOut ? 'Habis' : `Sisa ${p.stock}`;
        return `
          <div class="flex items-center justify-between p-3 rounded-2xl bg-cream-50 hover:bg-cream-100 transition-colors">
            <div class="flex items-center gap-3 min-w-0">
              <img src="${p.image}" alt="${p.name}" class="w-9 h-9 rounded-xl object-cover bg-white shadow-sm flex-shrink-0" onerror="this.src='favicon.svg'" />
              <div class="min-w-0">
                <p class="font-display font-bold text-xs text-caramel-900 truncate">${p.name}</p>
                <p class="text-[10px] text-caramel-500 font-semibold">${p.category}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0 pl-2">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${badgeColor}">${badgeText}</span>
              <button onclick="openEditProductModal('${p.id}')" class="px-2.5 py-1 rounded-xl bg-white text-caramel-800 text-[10px] font-black shadow-sm hover:text-coral-600 hover:bg-cream-200 transition-colors cursor-pointer">
                Restock
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function openNavDrawer() {
  updateNavDrawerAccess();
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-drawer-overlay');
  if (drawer && overlay) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      drawer.classList.remove('-translate-x-full');
    }, 10);
  }
}

function closeNavDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('-translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
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
      <div class="flex justify-between items-center text-xs py-2 border-b-2 border-dashed border-cream-200">
        <span class="font-bold text-caramel-800 truncate max-w-[200px]">${item.name} (${item.quantity}x)</span>
        <span class="font-black text-coral-600 font-display">${formatIDR(item.price * item.quantity)}</span>
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
      <img src="favicon.svg" alt="logo" style="width:32px;height:32px;border-radius:6px;vertical-align:middle;margin-bottom:6px;display:inline-block;" />
      <h2 style="margin:0;font-size:16px;font-weight:800;color:#fff;">daisyfumarket</h2>
      <p style="margin:2px 0 0;font-size:10px;opacity:0.9;">Marketplace Gaya Shopee</p>
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
    <button onclick="window.print()" style="padding:10px 24px;background:#F26B57;color:#fff;border:none;border-radius:14px;font-size:13px;font-weight:800;cursor:pointer;box-shadow:0 8px 18px -6px rgba(242,107,87,0.5);">
      🖨️ Cetak Ulang Struk
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
      background: linear-gradient(135deg, #F26B57 0%, #FF9B85 100%);
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
      border-bottom: 2px solid #F26B57;
    }
    .receipt-summary .summary-row.final {
      font-weight: 800;
      font-size: 11px;
      color: #E14E3B;
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
      color: #F26B57;
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

// Sync web data (products + transactions) to Firebase Firestore
async function syncToFirebase() {
  showToast('Menyinkronkan data ke Firebase...', 'success');
  const btn = document.querySelector('button[onclick="syncToFirebase()"]');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; }
  try {
    store.ensureBarcodes();
    let prodOk = 0, trxOk = 0;
    for (const p of store.products) {
      if (!p.id) continue;
      await db.collection('products').doc(p.id).set(p);
      prodOk++;
    }
    for (const t of store.transactions) {
      const tid = t.id || ('TRX-' + Date.now());
      await db.collection('transactions').doc(tid).set({ ...t, id: tid });
      trxOk++;
    }
    showToast(`Sinkron selesai: ${prodOk} produk + ${trxOk} transaksi di-Firestore-kan.`, 'success');
  } catch (e) {
    showToast('Gagal sync ke Firebase: ' + e.message, 'error');
  }
  if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
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
      ? '<span class="px-2.5 py-1 text-[10px] font-black rounded-full bg-rose-100 text-rose-600 border border-rose-200">Habis</span>'
      : product.stock <= 10 
        ? '<span class="px-2.5 py-1 text-[10px] font-black rounded-full bg-amber-100 text-amber-700 border border-amber-200">Menipis</span>'
        : '<span class="px-2.5 py-1 text-[10px] font-black rounded-full bg-sage-500/20 text-sage-600 border border-sage-500/30">Tersedia</span>';

    const bestSellerBadge = product.isBestSeller 
      ? '<span class="ml-1 text-[10px]">🔥</span>' 
      : '';

    return `
      <tr class="hover:bg-cream-100 transition-colors border-b border-cream-200 text-xs sm:text-sm">
        <td class="px-4 py-3.5">
          <input type="checkbox" class="product-checkbox accent-coral-500 w-4 h-4 cursor-pointer" value="${product.id}" />
        </td>
        <td class="px-4 py-3.5">
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-12 h-12 rounded-2xl object-cover bg-cream-100 flex-shrink-0 border border-cream-200 shadow-inner" 
              onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23FFF1CE%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%2240%22>📦</text></svg>';"
            />
            <div class="min-w-0">
              <p class="font-bold text-caramel-900 truncate max-w-[200px]">${product.name}${bestSellerBadge}</p>
              <p class="text-[10px] text-caramel-500 font-mono">${product.id}</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3.5 text-center">
          <svg class="product-barcode inline-block" data-barcode="${product.barcode || ''}" data-bwidth="1" data-bheight="22" width="96" height="22"></svg>
          <p class="text-[9px] font-mono text-caramel-500 font-bold mt-0.5">${product.barcode || '-'}</p>
        </td>
        <td class="px-4 py-3.5">
          <span class="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-cream-200 text-caramel-700">${product.category}</span>
        </td>
        <td class="px-4 py-3.5 text-right font-black text-caramel-900 font-display whitespace-nowrap">${formatIDR(product.price)}</td>
        <td class="px-4 py-3.5 text-center">
          <span class="font-black ${product.stock === 0 ? 'text-rose-500' : product.stock <= 10 ? 'text-amber-500' : 'text-caramel-800'}">${product.stock}</span>
        </td>
        <td class="px-4 py-3.5 text-center">
          <span class="text-amber-500 font-black">⭐ ${product.rating || '-'}</span>
        </td>
        <td class="px-4 py-3.5 text-center">${stockStatus}</td>
        <td class="px-4 py-3.5 text-center whitespace-nowrap">
          <div class="flex items-center justify-center gap-1.5">
            <button 
              onclick="openEditProductModal('${product.id}')"
              class="px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-caramel-800 text-[10px] font-extrabold transition-colors cursor-pointer border border-amber-200/60"
              title="Edit Produk"
            >
              ✏️ Edit
            </button>
            <button 
              onclick="openDeleteModal('${product.id}')"
              class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-extrabold transition-colors cursor-pointer border border-rose-200/60"
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
      if (p === '...') return '<span class="px-1 text-xs text-caramel-500 font-bold">...</span>';
      const isActive = p === inventoryPage;
      return `<button onclick="goToInventoryPage(${p})" class="w-8 h-8 rounded-2xl text-xs font-black transition-all cursor-pointer ${isActive ? 'bg-coral-500 text-white shadow-btn' : 'bg-white border-2 border-cream-200 text-caramel-700 hover:bg-cream-100'}">${p}</button>`;
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
  
  // Reset file input & show current image preview
  const fileInput = document.getElementById('product-image-file');
  if (fileInput) fileInput.value = '';
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
// 8d. AKUN MANAGEMENT
// ==========================================

// Format Firestore Timestamp / ISO string menjadi tanggal Indonesia
function formatAccountDate(value) {
  if (!value) return '-';
  try {
    const d = value.toDate ? value.toDate() : new Date(value);
    if (isNaN(d)) return '-';
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (e) {
    return '-';
  }
}

// Muat akun dari Firestore 'users' collection (atau localStorage saat Mode Demo)
async function loadAccounts() {
  if (demoMode) {
    try {
      const saved = JSON.parse(localStorage.getItem('nexamart_accounts') || 'null');
      if (saved && Array.isArray(saved)) {
        store.accounts = saved;
      } else {
        store.accounts = [{
          id: 'demo-admin',
          uid: 'demo-admin',
          email: 'admin@daisyfumarket.com',
          displayName: 'Admin Daisyfu',
          role: 'admin',
          isActive: true,
          createdAt: new Date().toISOString()
        }];
        localStorage.setItem('nexamart_accounts', JSON.stringify(store.accounts));
      }
    } catch (e) {
      store.accounts = [];
    }
    renderAccountsTable();
    return;
  }

  if (!store.uid) { store.accounts = []; renderAccountsTable(); return; }

  try {
    const snap = await db.collection('users').get();
    if (snap.empty && auth.currentUser) {
      // Seed user yang sedang login sebagai admin pertama
      const u = auth.currentUser;
      await db.collection('users').doc(u.uid).set({
        uid: u.uid,
        email: u.email || '',
        displayName: u.displayName || u.email || 'Admin',
        role: 'admin',
        isActive: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      const snap2 = await db.collection('users').get();
      store.accounts = snap2.docs.map(d => ({ id: d.id, ...d.data() }));
    } else {
      store.accounts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  } catch (e) {
    store.accounts = [];
    showToast('Gagal memuat daftar akun: ' + e.message, 'error');
  }
  renderAccountsTable();
}

// Ambil daftar akun sesuai filter pencarian/peran/status
function getFilteredAccounts() {
  const searchVal = (document.getElementById('akun-search')?.value || '').toLowerCase().trim();
  const roleFilter = document.getElementById('akun-role-filter')?.value || 'Semua';
  const statusFilter = document.getElementById('akun-status-filter')?.value || 'Semua';

  return store.accounts.filter(acc => {
    const matchSearch = !searchVal ||
      (acc.displayName && String(acc.displayName).toLowerCase().includes(searchVal)) ||
      (acc.email && String(acc.email).toLowerCase().includes(searchVal));
    const matchRole = roleFilter === 'Semua' || acc.role === roleFilter;
    const isActive = acc.isActive !== false;
    const matchStatus = statusFilter === 'Semua' || (statusFilter === 'Aktif' ? isActive : !isActive);
    return matchSearch && matchRole && matchStatus;
  });
}

// Render statistik + tabel akun
function renderAccountsTable() {
  const tbody = document.getElementById('akun-table-body');
  const emptyState = document.getElementById('akun-empty');
  const countEl = document.getElementById('akun-count');

  const total = store.accounts.length;
  const totalActive = store.accounts.filter(a => a.isActive !== false).length;
  const totalAdmin = store.accounts.filter(a => a.role === 'admin').length;
  const totalInactive = total - totalActive;

  const totalEl = document.getElementById('akun-total');
  const activeEl = document.getElementById('akun-active');
  const adminEl = document.getElementById('akun-admin');
  const inactiveEl = document.getElementById('akun-inactive');
  if (totalEl) totalEl.textContent = total;
  if (activeEl) activeEl.textContent = totalActive;
  if (adminEl) adminEl.textContent = totalAdmin;
  if (inactiveEl) inactiveEl.textContent = totalInactive;

  const filtered = getFilteredAccounts();
  if (countEl) countEl.textContent = `${filtered.length} akun`;

  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(acc => {
    const isActive = acc.isActive !== false;
    const roleLabel = acc.role === 'admin' ? 'Admin' : 'Staff';
    const roleColor = acc.role === 'admin'
      ? 'text-coral-600 bg-coral-400/20 border-coral-400/40'
      : 'text-sage-600 bg-sage-500/20 border-sage-500/30';
    const statusLabel = isActive ? 'Aktif' : 'Nonaktif';
    const statusColor = isActive
      ? 'text-sage-600 bg-sage-500/20 border-sage-500/30'
      : 'text-rose-600 bg-rose-100 border-rose-200';

    return `
      <tr class="hover:bg-cream-100 transition-colors border-b border-cream-200 text-xs sm:text-sm">
        <td class="px-4 py-3.5">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white text-xs font-black shadow-btn flex-shrink-0">${(acc.displayName || acc.email || '?').trim().charAt(0).toUpperCase()}</div>
            <div class="min-w-0">
              <p class="font-bold text-caramel-900 truncate max-w-[160px]">${acc.displayName || '-'}</p>
              <p class="text-[9px] text-caramel-500 font-mono truncate max-w-[160px]">${acc.uid || acc.id || '-'}</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3.5 font-mono text-caramel-700 font-medium truncate max-w-[200px]">${acc.email || '-'}</td>
        <td class="px-4 py-3.5"><span class="px-2.5 py-1 text-[10px] font-black rounded-full border ${roleColor}">${roleLabel}</span></td>
        <td class="px-4 py-3.5 text-center"><span class="px-2.5 py-1 text-[10px] font-black rounded-full border ${statusColor}">${statusLabel}</span></td>
        <td class="px-4 py-3.5 text-caramel-500 text-xs whitespace-nowrap font-medium">${formatAccountDate(acc.createdAt)}</td>
        <td class="px-4 py-3.5 text-center whitespace-nowrap">
          <div class="flex items-center justify-center gap-1.5">
            <button
              onclick="openEditAccountModal('${acc.id}')"
              class="px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-caramel-800 text-[10px] font-extrabold transition-colors cursor-pointer border border-amber-200/60"
              title="Edit Akun"
            >✏️ Edit</button>
            <button
              onclick="toggleAccountStatus('${acc.id}', ${isActive})"
              class="px-3 py-1.5 rounded-xl ${isActive ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60' : 'bg-sage-50 hover:bg-sage-100 text-sage-600 border border-sage-500/30'} text-[10px] font-extrabold transition-colors cursor-pointer"
              title="${isActive ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}"
            >${isActive ? '🚫 Nonaktif' : '✅ Aktifkan'}</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Buka modal tambah akun
function openAddAccountModal() {
  document.getElementById('account-modal-title').textContent = 'Tambah Akun Baru';
  document.getElementById('account-submit-btn').innerHTML = '<span>💾</span> Simpan Akun';
  document.getElementById('account-form').reset();
  document.getElementById('account-edit-id').value = '';
  document.getElementById('account-email').disabled = false;
  document.getElementById('account-password').required = true;
  document.getElementById('account-password').placeholder = 'Min. 6 karakter';

  const modal = document.getElementById('account-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// Buka modal edit akun
function openEditAccountModal(accountId) {
  const acc = store.accounts.find(a => a.id === accountId);
  if (!acc) return;

  document.getElementById('account-modal-title').textContent = 'Edit Akun';
  document.getElementById('account-submit-btn').innerHTML = '<span>💾</span> Perbarui Akun';
  document.getElementById('account-edit-id').value = acc.id;
  document.getElementById('account-name').value = acc.displayName || '';
  document.getElementById('account-email').value = acc.email || '';
  document.getElementById('account-email').disabled = true;
  document.getElementById('account-password').value = '';
  document.getElementById('account-password').required = false;
  document.getElementById('account-password').placeholder = 'Kosongkan jika tidak diubah';
  document.getElementById('account-role').value = acc.role || 'staff';
  document.getElementById('account-status').value = acc.isActive !== false ? 'true' : 'false';

  const modal = document.getElementById('account-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAccountModal() {
  const modal = document.getElementById('account-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  const emailInput = document.getElementById('account-email');
  if (emailInput) emailInput.disabled = false;
}

// Buat user Firebase Auth lewat app kedua agar sesi admin tidak ter-logout
async function createAuthAccount(email, password, name) {
  let secondary = firebase.apps.find(a => a.name === 'accountCreator');
  if (!secondary) secondary = firebase.initializeApp(firebaseConfig, 'accountCreator');
  const secondaryAuth = secondary.auth();
  const cred = await secondaryAuth.createUserWithEmailAndPassword(email, password);
  await cred.user.updateProfile({ displayName: name });
  const uid = cred.user.uid;
  await secondaryAuth.signOut();
  return uid;
}

// Simpan akun (tambah baru / perbarui) dari form modal
async function processAccountSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('account-edit-id').value;
  const name = document.getElementById('account-name').value.trim();
  const email = document.getElementById('account-email').value.trim();
  const password = document.getElementById('account-password').value;
  const role = document.getElementById('account-role').value;
  const isActive = document.getElementById('account-status').value === 'true';

  if (!name || !email) {
    showToast('Nama dan email wajib diisi.', 'error');
    return;
  }

  const btn = document.getElementById('account-submit-btn');
  btn.disabled = true;

  try {
    if (editId) {
      // Perbarui data akun yang sudah ada
      const updates = {
        displayName: name,
        role: role,
        isActive: isActive,
        updatedAt: demoMode ? new Date().toISOString() : firebase.firestore.FieldValue.serverTimestamp()
      };
      if (demoMode) {
        const idx = store.accounts.findIndex(a => a.id === editId);
        if (idx > -1) store.accounts[idx] = { ...store.accounts[idx], ...updates };
        localStorage.setItem('nexamart_accounts', JSON.stringify(store.accounts));
      } else {
        await db.collection('users').doc(editId).update(updates);
      }
      showToast(`Akun "${name}" berhasil diperbarui!`, 'success');
    } else {
      // Tambah akun baru
      if (!password || password.length < 6) {
        showToast('Password minimal 6 karakter.', 'error');
        btn.disabled = false;
        return;
      }
      const duplicate = store.accounts.find(a => String(a.email).toLowerCase() === email.toLowerCase());
      if (duplicate) {
        showToast('Email sudah terdaftar.', 'error');
        btn.disabled = false;
        return;
      }
      if (demoMode) {
        const uid = 'demo-' + Date.now();
        store.accounts.unshift({
          id: uid,
          uid: uid,
          email: email,
          displayName: name,
          role: role,
          isActive: isActive,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('nexamart_accounts', JSON.stringify(store.accounts));
      } else {
        const uid = await createAuthAccount(email, password, name);
        await db.collection('users').doc(uid).set({
          uid: uid,
          email: email,
          displayName: name,
          role: role,
          isActive: isActive,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      showToast(`Akun "${name}" berhasil ditambahkan!`, 'success');
    }

    closeAccountModal();
    await loadAccounts();
  } catch (err) {
    showToast('Gagal menyimpan akun: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}

// Aktif / nonaktifkan akun
async function toggleAccountStatus(accountId, currentlyActive) {
  const acc = store.accounts.find(a => a.id === accountId);
  if (!acc) return;
  const newStatus = !currentlyActive;

  try {
    if (demoMode) {
      const idx = store.accounts.findIndex(a => a.id === accountId);
      if (idx > -1) store.accounts[idx] = { ...store.accounts[idx], isActive: newStatus };
      localStorage.setItem('nexamart_accounts', JSON.stringify(store.accounts));
    } else {
      await db.collection('users').doc(accountId).update({
        isActive: newStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    showToast(`Akun "${acc.displayName || acc.email}" ${newStatus ? 'diaktifkan' : 'dinonaktifkan'}.`, 'success');
    await loadAccounts();
  } catch (err) {
    showToast('Gagal mengubah status akun: ' + err.message, 'error');
  }
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

  // Account Form Submission
  const accountForm = document.getElementById('account-form');
  if (accountForm) {
    accountForm.addEventListener('submit', processAccountSubmit);
  }
});
