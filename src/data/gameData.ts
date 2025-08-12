import { MenuItem, Threat } from "@/types/game";

export const menuItems: MenuItem[] = [
    { name: "Nasi Goreng", tags: ["Savory", "Warm", "Traditional"] },
    { name: "Mie Ayam", tags: ["Savory", "Warm", "Cheap"] },
    { name: "Gado-Gado", tags: ["Fresh", "Healthy", "Light"] },
    { name: "Sate Ayam", tags: ["Savory", "Spicy", "Hot"] },
    { name: "Es Cendol", tags: ["Sweet", "Cold", "Traditional"] },
    { name: "Bakso", tags: ["Savory", "Hot", "Cheap"] },
    { name: "Rendang", tags: ["Savory", "Spicy", "Traditional"] },
    { name: "Martabak Manis", tags: ["Sweet", "Warm", "Trendy"] },
    { name: "Soto Ayam", tags: ["Savory", "Hot", "Light"] },
    { name: "Es Teh Manis", tags: ["Sweet", "Cold", "Cheap"] },
    { name: "Pecel Lele", tags: ["Savory", "Spicy", "Cheap"] },
    { name: "Rujak", tags: ["Fresh", "Spicy", "Healthy"] }
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
    "Savory", "Cheap", "Sweet", "Trendy", "Spicy", "Fresh", "Hot", "Light", "Cold", "Healthy", "Traditional", "Warm"
];

export const threats: Threat[] = [
    { name: "Supply Chain Delay", eliminates: ["Cheap"] },
    { name: "Health Campaign Surge", eliminates: ["Light"] },
    { name: "Festival Food Trend", eliminates: ["Traditional"] },
    { name: "Weather-Related Storage Issue", eliminates: ["Fresh"] },
    { name: "Social Media Backlash", eliminates: ["Trendy"] },
    { name: "Diet Trend Shift", eliminates: ["Healthy"] }
];