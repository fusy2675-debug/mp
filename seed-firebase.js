/**
 * Seed data produk & transaksi ke Firebase Firestore menggunakan Admin SDK
 * 
 * CARA PAKAI:
 * 1. Download Service Account Key dari Firebase Console:
 *    Project Settings → Service Accounts → Generate New Private Key
 *    Simpan sebagai `service-account.json` di folder ini.
 * 
 * 2. Install dependency:
 *    npm install firebase-admin
 * 
 * 3. Jalankan:
 *    node seed-firebase.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ==========================================
// KONFIGURASI
// ==========================================
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');

// Data produk (sama persis dengan app.js / seed.html)
const PRODUCTS = [
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

const TRANSACTIONS = [
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
// FUNGSI UTAMA
// ==========================================
async function seedData() {
  // Cek service account
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error('❌ File service-account.json tidak ditemukan!');
    console.log('');
    console.log('📋 Cara mendapatkannya:');
    console.log('   1. Buka Firebase Console → Project Settings (⚙️)');
    console.log('   2. Tab "Service Accounts" → klik "Generate New Private Key"');
    console.log('   3. Simpan file JSON sebagai "service-account.json" di folder ini');
    console.log('   4. Jalankan script ini lagi: node seed-firebase.js');
    process.exit(1);
  }

  // Init Firebase Admin
  const serviceAccount = require(SERVICE_ACCOUNT_PATH);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();
  console.log('🔥 Terhubung ke Firebase:', serviceAccount.project_id);
  console.log('');

  // Seed Products
  console.log('📦 Seeding Products...');
  const productsBatch = db.batch();
  let productCount = 0;
  
  for (const product of PRODUCTS) {
    const ref = db.collection('products').doc(product.id);
    productsBatch.set(ref, product);
    productCount++;
    if (productCount % 10 === 0) {
      console.log(`   ${productCount}/${PRODUCTS.length} produk...`);
    }
  }
  
  await productsBatch.commit();
  console.log(`✅ ${PRODUCTS.length} produk berhasil di-upload!`);

  // Seed Transactions
  console.log('');
  console.log('🧾 Seeding Transactions...');
  const transactionsBatch = db.batch();
  
  for (const transaction of TRANSACTIONS) {
    const ref = db.collection('transactions').doc(transaction.id);
    transactionsBatch.set(ref, transaction);
  }
  
  await transactionsBatch.commit();
  console.log(`✅ ${TRANSACTIONS.length} transaksi berhasil di-upload!`);

  console.log('');
  console.log('🎉 SEED SELESAI! Data sudah ada di Firestore.');
  console.log('   Project:', serviceAccount.project_id);
  console.log('   Cek di Firebase Console → Firestore Database');
}

seedData().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});