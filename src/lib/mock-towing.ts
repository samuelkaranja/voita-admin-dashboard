import { TowingProvider } from "@/types";

export const towingProviders: TowingProvider[] = [
  {
    id: "1",
    name: "Lagos Quick Tow",
    avatarUrl:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=80&h=80",
    vehicleType: "Flatbed",
    etaMinMins: 15,
    etaMaxMins: 25,
    availability: "Available",
    isPartner: true,
    rating: 4.6,
    phoneNumber: "+2348012345678",
    description:
      "Fast response flatbed towing across the Lagos metropolis. GPS-tracked fleet with real-time ETAs and 24/7 availability.",
    tags: ["Flatbed", "GPS Tracking", "Night Service"],
    dateAdded: "2024-03-15",
    detailedServices: [
      {
        id: "ds1",
        label: "Flatbed Towing",
        iconKey: "truck",
        description: "Full vehicle flatbed transport, up to 3 tonnes",
        highlighted: true,
      },
      {
        id: "ds2",
        label: "Winching Service",
        iconKey: "anchor",
        description: "Vehicle extraction from ditches and off-road situations",
        highlighted: false,
      },
    ],
    quickServices: [
      { id: "qs1", label: "Battery Jump Start", iconKey: "battery" },
      { id: "qs2", label: "Tire Change", iconKey: "circle" },
    ],
  },
  {
    id: "2",
    name: "Highway Rescue NG",
    avatarUrl: "https://i.pravatar.cc/150?img=60",
    vehicleType: "Heavy Duty",
    etaMinMins: 20,
    etaMaxMins: 40,
    availability: "Available",
    isPartner: true,
    rating: 4.4,
    phoneNumber: "+2348023456789",
    description: "Heavy duty recovery for trucks and larger vehicles.",
    tags: ["Heavy Duty", "24/7"],
    dateAdded: "2024-02-05",
    detailedServices: [],
    quickServices: [],
  },
  {
    id: "3",
    name: "Roadside Angels",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    vehicleType: "Roadside",
    etaMinMins: 10,
    etaMaxMins: 20,
    availability: "Busy",
    isPartner: false,
    rating: 4.3,
    phoneNumber: "+2348034567890",
    description: "Quick roadside assistance for minor breakdowns.",
    tags: ["Roadside", "Jump Start"],
    dateAdded: "2024-03-15",
    detailedServices: [],
    quickServices: [],
  },
];

export function getTowingProviderById(id: string): TowingProvider | undefined {
  return towingProviders.find((p) => p.id === id);
}
