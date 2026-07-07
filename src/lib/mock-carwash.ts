import { CarWash } from "@/types";

export const carWashes: CarWash[] = [
  {
    id: "1",
    name: "Crystal Clear Auto Spa",
    avatarUrl:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=80&h=80",
    area: "Victoria Island",
    address: "15 Adetokunbo Ademola Street, Victoria Island",
    description:
      "Premium detailing center offering the full range of interior and exterior services. We use 3M and Meguiar's professional-grade products exclusively.",
    rating: 4.7,
    waitTimeMins: 20,
    verified: true,
    tags: ["Full Detail", "Interior Deep Clean", "Eco-Wax"],
    dateAdded: "2024-03-01",
    services: [
      {
        id: "cs1",
        label: "Exterior Polish",
        iconKey: "sparkles",
        description: "Hand wash, clay bar treatment, and machine polish",
        price: 25000,
        premium: false,
      },
      {
        id: "cs2",
        label: "Interior Detailing",
        iconKey: "home",
        description: "Full steam clean, leather treatment, and deodorize",
        price: 35000,
        premium: true,
      },
      {
        id: "cs3",
        label: "Ceramic Coating",
        iconKey: "shield",
        description: "2-year ceramic protection with hydrophobic finish",
        price: 150000,
        premium: true,
      },
    ],
  },
  {
    id: "2",
    name: "SpeedWash Pro",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    area: "Lekki Phase 1",
    address: "5 Admiralty Way, Lekki Phase 1",
    description: "Fast, no-frills exterior wash for busy drivers.",
    rating: 4.2,
    waitTimeMins: 10,
    verified: true,
    tags: ["Quick Wash", "Exterior"],
    dateAdded: "2024-02-14",
    services: [],
  },
  {
    id: "3",
    name: "EcoShine Detail Center",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
    area: "Ikeja GRA",
    address: "22 Oduduwa Crescent, Ikeja GRA",
    description: "Waterless washing with biodegradable solutions.",
    rating: 4.5,
    waitTimeMins: 30,
    verified: false,
    tags: ["Eco-Friendly", "Full Detail", "Interior Deep Clean"],
    dateAdded: "2024-03-01",
    services: [],
  },
];

export function getCarWashById(id: string): CarWash | undefined {
  return carWashes.find((c) => c.id === id);
}
