import { Scout } from "@/types";

export const scouts: Scout[] = [
  {
    id: "1",
    name: "Emeka Osei",
    avatarUrl:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=80&h=80",
    role: "Expert Quote Auditor",
    category: "Auditors",
    bio: "Certified mechanical engineer with 8 years auditing automotive repair quotes. Has saved clients an average of 35% on repair costs through accurate pre-repair assessments and workshop negotiations.",
    location: "Lagos, Nigeria",
    ctaType: "Book Scout",
    accentColor: "#10B981",
    rating: 4.9,
    missionsCompleted: 247,
    verified: true,
    dateAdded: "2024-01-10",
    tags: ["Quote Auditor", "Engine Specialist", "Lagos Based"],
    skills: [
      {
        id: "sk1",
        label: "Quote Analysis",
        iconKey: "search",
        subtitle: "Breaks down repair costs to identify overcharging",
      },
    ],
    reviews: [
      {
        id: "rv1",
        reviewerName: "Tunde Bakare",
        rating: 5,
        comment:
          "Emeka saved me ₦180,000 on a fake engine rebuild quote. Absolute professional who knows his stuff.",
      },
    ],
  },
  {
    id: "2",
    name: "Fatima Aliyu",
    avatarUrl: "https://i.pravatar.cc/150?img=44",
    role: "Car Diagnostics Scout",
    category: "Diagnostics",
    bio: "On-demand diagnostics for check-engine lights and unusual noises.",
    location: "Abuja, Nigeria",
    ctaType: "Quick Request",
    accentColor: "#3B82F6",
    rating: 4.7,
    missionsCompleted: 183,
    verified: true,
    dateAdded: "2024-02-12",
    tags: [],
    skills: [],
    reviews: [],
  },
  {
    id: "3",
    name: "Chidi Eze",
    avatarUrl: "https://i.pravatar.cc/150?img=22",
    role: "Premium Valet Specialist",
    category: "Valet",
    bio: "Professional valet service for events and airport drop-offs.",
    location: "Lagos, Nigeria",
    ctaType: "Schedule Valet",
    accentColor: "#A855F7",
    rating: 4.5,
    missionsCompleted: 94,
    verified: false,
    dateAdded: "2024-04-01",
    tags: [],
    skills: [],
    reviews: [],
  },
];

export function getScoutById(id: string): Scout | undefined {
  return scouts.find((s) => s.id === id);
}
