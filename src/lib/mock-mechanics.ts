import { Mechanic } from "@/types";

export const mechanics: Mechanic[] = [
  {
    id: "1",
    name: "James Okonkwo",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80",
    address: "14 Broad Street, Lagos Island",
    primarySpecialty: "Engine Tuning",
    specialtyCategory: "Engine",
    specialties: ["BMW Specialist", "Engine Tuning", "Turbo Repair"],
    description:
      "Certified master technician with 15 years specializing in European vehicles. Previously worked with Mercedes-Benz and BMW dealerships before founding his own workshop.",
    rating: 4.8,
    verified: true,
    availableToday: true,
    dateAdded: "2024-01-15",
    services: [
      {
        id: "s1",
        label: "Engine Diagnostics",
        iconKey: "cpu",
        description: "Full OBD-II diagnostic scan and analysis report",
        highlighted: true,
      },
      {
        id: "s2",
        label: "Turbo Rebuild",
        iconKey: "zap",
        description: "Complete turbocharger inspection and rebuild service",
        highlighted: false,
      },
    ],
    insurancePartners: [
      { id: "p1", name: "AXA Mansard", logoUrl: "" },
      { id: "p2", name: "Leadway Assurance", logoUrl: "" },
    ],
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    address: "",
    primarySpecialty: "Electrical Systems",
    specialtyCategory: "Electrical",
    specialties: [],
    description: "",
    rating: 4.6,
    verified: true,
    availableToday: false,
    dateAdded: "2024-02-03",
    services: [],
    insurancePartners: [],
  },
  // ...same pattern for ids 3, 4, 5 with empty detail arrays
];

export function getMechanicById(id: string): Mechanic | undefined {
  return mechanics.find((m) => m.id === id);
}
