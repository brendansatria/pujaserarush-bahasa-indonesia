import { MenuItem, Threat } from "@/types/game";

export const menuItems: MenuItem[] = [
    { name: "Nasi Goreng", tags: ["Gurih", "Hangat", "Tradisional"] },
    { name: "Es Cendol", tags: ["Manis", "Dingin", "Tradisional"] },
    { name: "Soto Ayam", tags: ["Gurih", "Panas", "Ringan"] },
    { name: "Ayam Geprek", tags: ["Pedas", "Hangat", "Kekinian"] },
    { name: "Es Kelapa Muda", tags: ["Manis", "Dingin", "Segar"] },
    { name: "Gado-Gado", tags: ["Gurih", "Dingin", "Sehat"] },
    { name: "Sate Ayam", tags: ["Gurih", "Panas", "Tradisional"] },
    { name: "Cappucino Cincau", tags: ["Manis", "Dingin", "Kekinian"] },
    { name: "Rendang Daging", tags: ["Pedas", "Hangat", "Tradisional"] },
    { name: "Es Teh Manis", tags: ["Manis", "Dingin", "Murah"] },
    { name: "Bakso Sapi", tags: ["Gurih", "Panas", "Murah"] },
    { name: "Sambal Goreng Tempe", tags: ["Pedas", "Hangat", "Sehat"] },
    { name: "Pisang Goreng", tags: ["Manis", "Hangat", "Murah"] },
    { name: "Mie Goreng", tags: ["Gurih", "Hangat", "Kekinian"] },
    { name: "Es Campur", tags: ["Manis", "Dingin", "Ringan"] },
    { name: "Sayur Lodeh", tags: ["Pedas", "Panas", "Sehat"] },
    { name: "Ayam Bakar", tags: ["Pedas", "Panas", "Tradisional"] },
    { name: "Kopi Tubruk", tags: ["Manis", "Panas", "Murah"] },
    { name: "Urap Sayur", tags: ["Gurih", "Dingin", "Sehat"] },
    { name: "Martabak Manis", tags: ["Manis", "Hangat", "Kekinian"] },
    { name: "Ikan Bakar", tags: ["Pedas", "Panas", "Segar"] },
    { name: "Bubur Ayam", tags: ["Gurih", "Panas", "Ringan"] },
    { name: "Es Jeruk", tags: ["Manis", "Dingin", "Segar"] },
    { name: "Pepes Ikan", tags: ["Pedas", "Hangat", "Sehat"] },
    { name: "Rujak Buah", tags: ["Pedas", "Dingin", "Segar"] }
];

export const indonesianNames: { name: string; gender: 'male' | 'female' }[] = [
    { name: "Ahmad", gender: "male" },
    { name: "Budi", gender: "male" },
    { name: "Dedi", gender: "male" },
    { name: "Eka", gender: "male" },
    { name: "Hasan", gender: "male" },
    { name: "Indra", gender: "male" },
    { name: "Jono", gender: "male" },
    { name: "Putra", gender: "male" },
    { name: "Tono", gender: "male" },
    { name: "Citra", gender: "female" },
    { name: "Dewi", gender: "female" },
    { name: "Fitri", gender: "female" },
    { name: "Gita", gender: "female" },
    { name: "Lestari", gender: "female" },
    { name: "Maya", gender: "female" },
    { name: "Nia", gender: "female" },
    { name: "Rina", gender: "female" },
    { name: "Siti", gender: "female" },
    { name: "Wati", gender: "female" },
    { name: "Yuni", gender: "female" }
];

export const customerTypes: { name: string; preferences: string[] }[] = [
    { name: "Office Worker", preferences: ["Gurih", "Murah"] },
    { name: "Teen Student", preferences: ["Manis", "Kekinian"] },
    { name: "Spicy Fan", preferences: ["Pedas", "Segar"] },
    { name: "Commuter", preferences: ["Panas", "Ringan"] },
    { name: "Health Fan", preferences: ["Dingin", "Sehat"] },
    { name: "Tourist", preferences: ["Gurih", "Tradisional"] },
    { name: "Influencer", preferences: ["Manis", "Kekinian"] },
    { name: "Shopper", preferences: ["Hangat", "Murah"] },
    { name: "Elder", preferences: ["Panas", "Tradisional"] },
    { name: "Gym Goer", preferences: ["Pedas", "Sehat"] },
    { name: "Parent", preferences: ["Manis", "Ringan"] },
    { name: "Regular", preferences: ["Gurih", "Murah"] },
    { name: "Explorer", preferences: ["Dingin", "Tradisional"] },
    { name: "Foodie", preferences: ["Hangat", "Kekinian"] },
    { name: "Early Worker", preferences: ["Panas", "Murah"] },
    { name: "Vegetarian", preferences: ["Gurih", "Sehat"] },
    { name: "Dessert Lover", preferences: ["Manis", "Segar"] },
    { name: "Festival Goer", preferences: ["Pedas", "Kekinian"] },
    { name: "Rainy Patron", preferences: ["Hangat", "Ringan"] },
    { name: "Market Goer", preferences: ["Dingin", "Segar"] }
];

export const allTags: string[] = [
    "Gurih", "Hangat", "Tradisional", "Manis", "Dingin", "Panas", "Ringan", "Pedas", "Kekinian", "Segar", "Sehat", "Murah"
];

export const threats: Threat[] = [
    { name: "Keterlambatan Stok", description: "Keterlambatan pengiriman bahan baku membuat hidangan dengan harga yang bersaing menjadi sangat sedikit pada ronde ini.", eliminates: ["Murah"] },
    { name: "Kampanye Kesehatan", description: "Kampanye kesehatan yang sukses, mengurangi minat makan-makanan yang kurang bergizi.", eliminates: ["Ringan"] },
    { name: "Festival Makanan", description: "Festival Makanan menyajikan banyak makanan modern yang Instagrammable, menurunkan minat pada menu-menu yang \"ketinggalan zaman\".", eliminates: ["Tradisional"] },
    { name: "Cuaca Ekstrim", description: "Cuaca ekstrim yang sangat lembab menyebabkan sulit menjaga kualitas bahan-bahan tertentu.", eliminates: ["Segar"] },
    { name: "Kritik di Media Sosial", description: "Postingan viral mengkritik hidangan yang sedang \"naik daun\" hanya karena strategi marketing saja, mengurangi daya tariknya di kalangan pelanggan pada ronde ini.", eliminates: ["Kekinian"] },
    { name: "Pergeseran Tren Diet", description: "Tren cara diet baru mendorong pelanggan untuk meninggalkan hidangan padat nutrisi.", eliminates: ["Sehat"] }
];