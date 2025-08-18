import { MenuItem, Threat } from "@/types/game";

export const menuItems: MenuItem[] = [
    { name: "Nasi Goreng", tags: ["Savory", "Warm", "Traditional"] },
    { name: "Es Cendol", tags: ["Sweet", "Cold", "Traditional"] },
    { name: "Soto Ayam", tags: ["Savory", "Hot", "Light"] },
    { name: "Ayam Geprek", tags: ["Spicy", "Warm", "Trendy"] },
    { name: "Es Kelapa Muda", tags: ["Sweet", "Cold", "Fresh"] },
    { name: "Gado-Gado", tags: ["Savory", "Cold", "Healthy"] },
    { name: "Sate Ayam", tags: ["Savory", "Hot", "Traditional"] },
    { name: "Cappucino Cincau", tags: ["Sweet", "Cold", "Trendy"] },
    { name: "Rendang Daging", tags: ["Spicy", "Warm", "Traditional"] },
    { name: "Es Teh Manis", tags: ["Sweet", "Cold", "Cheap"] },
    { name: "Bakso Sapi", tags: ["Savory", "Hot", "Cheap"] },
    { name: "Sambal Goreng Tempe", tags: ["Spicy", "Warm", "Healthy"] },
    { name: "Pisang Goreng", tags: ["Sweet", "Warm", "Cheap"] },
    { name: "Mie Goreng", tags: ["Savory", "Warm", "Trendy"] },
    { name: "Es Campur", tags: ["Sweet", "Cold", "Light"] },
    { name: "Sayur Lodeh", tags: ["Spicy", "Hot", "Healthy"] },
    { name: "Ayam Bakar", tags: ["Spicy", "Hot", "Traditional"] },
    { name: "Kopi Tubruk", tags: ["Sweet", "Hot", "Cheap"] },
    { name: "Tahu Tek", tags: ["Savory", "Cold", "Healthy"] },
    { name: "Martabak Manis", tags: ["Sweet", "Warm", "Trendy"] },
    { name: "Ikan Bakar", tags: ["Spicy", "Hot", "Fresh"] },
    { name: "Bubur Ayam", tags: ["Savory", "Hot", "Light"] },
    { name: "Es Jeruk", tags: ["Sweet", "Cold", "Fresh"] },
    { name: "Pepes Ikan", tags: ["Spicy", "Warm", "Healthy"] },
    { name: "Rujak Buah", tags: ["Spicy", "Cold", "Fresh"] }
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
    { name: "Office Worker", preferences: ["Savory", "Cheap"] },
    { name: "Teen Student", preferences: ["Sweet", "Trendy"] },
    { name: "Spicy Fan", preferences: ["Spicy", "Fresh"] },
    { name: "Commuter", preferences: ["Hot", "Light"] },
    { name: "Health Fan", preferences: ["Cold", "Healthy"] },
    { name: "Tourist", preferences: ["Savory", "Traditional"] },
    { name: "Influencer", preferences: ["Sweet", "Trendy"] },
    { name: "Shopper", preferences: ["Warm", "Cheap"] },
    { name: "Elder", preferences: ["Hot", "Traditional"] },
    { name: "Gym Goer", preferences: ["Spicy", "Healthy"] },
    { name: "Parent", preferences: ["Sweet", "Light"] },
    { name: "Regular", preferences: ["Savory", "Cheap"] },
    { name: "Explorer", preferences: ["Cold", "Traditional"] },
    { name: "Foodie", preferences: ["Warm", "Trendy"] },
    { name: "Early Worker", preferences: ["Hot", "Cheap"] },
    { name: "Vegetarian", preferences: ["Savory", "Healthy"] },
    { name: "Dessert Lover", preferences: ["Sweet", "Fresh"] },
    { name: "Festival Goer", preferences: ["Spicy", "Trendy"] },
    { name: "Rainy Patron", preferences: ["Warm", "Light"] },
    { name: "Market Goer", preferences: ["Cold", "Fresh"] }
];

export const allTags: string[] = [
    "Savory", "Warm", "Traditional", "Sweet", "Cold", "Hot", "Light", "Spicy", "Trendy", "Fresh", "Healthy", "Cheap"
];

export const threats: Threat[] = [
    { name: "Supply Chain Delay", description: "A delay in ingredient deliveries means budget-friendly dishes are harder to prepare this round.", eliminates: ["Cheap"] },
    { name: "Health Campaign Surge", description: "A local health campaign discourages indulgent eating, lowering interest in certain dishes.", eliminates: ["Light"] },
    { name: "Festival Food Trend", description: "A nearby festival highlights modern, Instagrammable foods, shifting customer preferences away from other options.", eliminates: ["Traditional"] },
    { name: "Weather-Related Storage Issue", description: "Humid weather causes storage challenges, making it difficult to maintain certain ingredients' quality.", eliminates: ["Fresh"] },
    { name: "Social Media Backlash", description: "A viral post criticizes certain popular dishes, reducing their appeal among customers this round.", eliminates: ["Trendy"] },
    { name: "Diet Trend Shift", description: "A new diet fad encourages customers to avoid nutrient-dense or specialty dishes.", eliminates: ["Healthy"] }
];