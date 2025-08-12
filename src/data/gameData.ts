import { MenuItem, Threat } from "@/types/game";

export const menuItems: MenuItem[] = [
    { name: "Nasi Goreng", tags: ["Savory", "Warm", "Traditional"] },
    { name: "Mie Ayam", tags: ["Savory", "Warm", "Comfort"] },
    { name: "Gado-Gado", tags: ["Fresh", "Healthy", "Traditional"] },
    { name: "Sate Ayam", tags: ["Savory", "Spicy", "Grilled"] },
    { name: "Es Cendol", tags: ["Sweet", "Cold", "Traditional"] },
    { name: "Bakso", tags: ["Savory", "Warm", "Comfort"] },
    { name: "Rendang", tags: ["Savory", "Spicy", "Traditional"] },
    { name: "Martabak Manis", tags: ["Sweet", "Warm", "Indulgent"] },
    { name: "Soto Ayam", tags: ["Savory", "Warm", "Comfort"] },
    { name: "Es Teh Manis", tags: ["Sweet", "Cold", "Refreshing"] },
    { name: "Pecel Lele", tags: ["Savory", "Spicy", "Traditional"] },
    { name: "Rujak", tags: ["Fresh", "Spicy", "Healthy"] }
];

export const customerTypes = [
    { name: "Office Worker", preferences: ["Savory", "Warm", "Quick"] },
    { name: "Student", preferences: ["Cheap", "Filling", "Comfort"] },
    { name: "Tourist", preferences: ["Traditional", "Authentic", "Popular"] },
    { name: "Health Enthusiast", preferences: ["Fresh", "Healthy", "Light"] },
    { name: "Sweet Tooth", preferences: ["Sweet", "Indulgent", "Cold"] },
    { name: "Spice Lover", preferences: ["Spicy", "Bold", "Traditional"] },
    { name: "Busy Parent", preferences: ["Quick", "Familiar", "Warm"] },
    { name: "Food Blogger", preferences: ["Unique", "Photogenic", "Trending"] }
];

export const allTags: string[] = [
    "Savory", "Sweet", "Spicy", "Cold", "Warm", "Traditional", "Fresh", "Healthy", "Comfort", "Grilled", "Indulgent", "Refreshing", "Quick", "Filling", "Cheap", "Authentic", "Popular", "Light", "Bold", "Familiar", "Unique", "Photogenic", "Trending"
];

export const threats: Threat[] = [
    { name: "Rainy Weather", eliminates: ["Cold"] },
    { name: "Supply Shortage", eliminates: ["Traditional"] },
    { name: "Health Campaign", eliminates: ["Indulgent", "Spicy"] },
    { name: "Power Outage", eliminates: ["Cold", "Warm"] },
    { name: "Festival Day", eliminates: ["Quick"] }
];