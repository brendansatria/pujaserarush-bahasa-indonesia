import { MenuItem, Threat } from "@/types/game";

export const menuItems: MenuItem[] = [
    { name: "Nasi Goreng", tags: ["Savory", "Warm", "Traditional"] },
    { name: "Es Cendol", tags: ["Sweet", "Cold", "Traditional"] },
    { name: "Soto Ayam", tags: ["Savory", "Hot", "Light"] },
    { name: "Ayam Geprek", tags: ["Spicy", "Warm", "Trendy"] },
    { name: "Es Kelapa Muda", tags: ["Sweet", "Cold", "Fresh"] },
    { name: "Gado-Gado", tags: ["Savory", "Cold", "Healthy"] },
    { name: "Sate Ayam", tags: ["Savory", "Hot", "Traditional"] },
    { name: "Klepon", tags: ["Sweet", "Cold", "Trendy"] },
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

export const customerTypes: { name: string; preferences: string[] }[] = [
    { name: "Office Worker", preferences: ["Savory", "Cheap"] },
    { name: "Teen Student", preferences: ["Sweet", "Trendy"] },
    { name: "Spicy Food Fan", preferences: ["Spicy", "Fresh"] },
    { name: "Morning Commuter", preferences: ["Hot", "Light"] },
    { name: "Health-Conscious Diner", preferences: ["Cold", "Healthy"] },
    { name: "Foodie Tourist", preferences: ["Savory", "Traditional"] },
    { name: "Trendy Influencer", preferences: ["Sweet", "Trendy"] },
    { name: "Budget Shopper", preferences: ["Warm", "Cheap"] },
    { name: "Local Elder", preferences: ["Hot", "Traditional"] },
    { name: "Gym Goer", preferences: ["Spicy", "Healthy"] },
    { name: "Family Parent", preferences: ["Sweet", "Light"] },
    { name: "Street Vendor Regular", preferences: ["Savory", "Cheap"] },
    { name: "Cultural Explorer", preferences: ["Cold", "Traditional"] },
    { name: "Social Media Foodie", preferences: ["Warm", "Trendy"] },
    { name: "Early Bird Worker", preferences: ["Hot", "Cheap"] },
    { name: "Vegetarian Visitor", preferences: ["Savory", "Healthy"] },
    { name: "Dessert Lover", preferences: ["Sweet", "Fresh"] },
    { name: "Festival Goer", preferences: ["Spicy", "Trendy"] },
    { name: "Rainy Day Patron", preferences: ["Warm", "Light"] },
    { name: "Market Shopper", preferences: ["Cold", "Fresh"] }
];

export const allTags: string[] = [
    "Savory", "Warm", "Traditional", "Sweet", "Cold", "Hot", "Light", "Spicy", "Trendy", "Fresh", "Healthy", "Cheap"
];

export const threats: Threat[] = [
    { name: "Supply Chain Delay", eliminates: ["Cheap"] },
    { name: "Health Campaign Surge", eliminates: ["Light"] },
    { name: "Festival Food Trend", eliminates: ["Traditional"] },
    { name: "Weather-Related Storage Issue", eliminates: ["Fresh"] },
    { name: "Social Media Backlash", eliminates: ["Trendy"] },
    { name: "Diet Trend Shift", eliminates: ["Healthy"] }
];