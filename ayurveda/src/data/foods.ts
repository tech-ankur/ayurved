export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  rasa: string[];
  virya: string;
  guna: string;
  dosha: {
    vata: string;
    pitta: string;
    kapha: string;
  };
}

export const foods: Food[] = [
  {
    id: "f1",
    name: "Steamed Rice",
    calories: 130,
    protein: 2.4,
    carbs: 28,
    fats: 0.3,
    rasa: ["Madhura"],
    virya: "Cooling",
    guna: "Light",
    dosha: { vata: "neutral", pitta: "pacifies", kapha: "aggravates" },
  },
  {
    id: "f2",
    name: "Moong Dal",
    calories: 116,
    protein: 8,
    carbs: 20,
    fats: 0.4,
    rasa: ["Madhura"],
    virya: "Cooling",
    guna: "Light",
    dosha: { vata: "pacifies", pitta: "pacifies", kapha: "pacifies" },
  },
  {
    id: "f3",
    name: "Ghee (1 tsp)",
    calories: 45,
    protein: 0,
    carbs: 0,
    fats: 5,
    rasa: ["Madhura"],
    virya: "Heating",
    guna: "Heavy",
    dosha: { vata: "pacifies", pitta: "aggravates", kapha: "aggravates" },
  },
  {
    id: "f4",
    name: "Buttermilk",
    calories: 99,
    protein: 8,
    carbs: 12,
    fats: 3,
    rasa: ["Amla", "Lavana"],
    virya: "Cooling",
    guna: "Light",
    dosha: { vata: "pacifies", pitta: "pacifies", kapha: "neutral" },
  },
  {
    id: "f5",
    name: "Ginger Tea",
    calories: 2,
    protein: 0,
    carbs: 0,
    fats: 0,
    rasa: ["Katu"],
    virya: "Heating",
    guna: "Light",
    dosha: { vata: "pacifies", pitta: "aggravates", kapha: "pacifies" },
  },
  {
    id: "f6",
    name: "Chapati (1)",
    calories: 120,
    protein: 3.6,
    carbs: 18,
    fats: 3,
    rasa: ["Madhura"],
    virya: "Heating",
    guna: "Light",
    dosha: { vata: "aggravates", pitta: "neutral", kapha: "neutral" },
  },
  {
    id: "f7",
    name: "Steamed Vegetables",
    calories: 80,
    protein: 3,
    carbs: 14,
    fats: 1,
    rasa: ["Kashaya", "Tikta"],
    virya: "Cooling",
    guna: "Light",
    dosha: { vata: "aggravates", pitta: "pacifies", kapha: "pacifies" },
  },
  {
    id: "f8",
    name: "Curd (100g)",
    calories: 98,
    protein: 11,
    carbs: 4,
    fats: 5,
    rasa: ["Amla", "Madhura"],
    virya: "Cooling",
    guna: "Heavy",
    dosha: { vata: "aggravates", pitta: "aggravates", kapha: "pacifies" },
  },
  {
    id: "f9",
    name: "Paneer (50g)",
    calories: 145,
    protein: 9,
    carbs: 4,
    fats: 10,
    rasa: ["Madhura"],
    virya: "Cooling",
    guna: "Heavy",
    dosha: { vata: "pacifies", pitta: "neutral", kapha: "aggravates" },
  },
]
