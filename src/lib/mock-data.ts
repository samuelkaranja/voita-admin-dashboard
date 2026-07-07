import { StatCardData, ActivityItem } from "@/types";

export const stats: StatCardData[] = [
  { id: "mechanics", label: "Total Mechanics", value: 5, icon: "wrench" },
  { id: "carwash", label: "Total Car Washes", value: 3, icon: "droplet" },
  { id: "towing", label: "Towing Providers", value: 3, icon: "truck" },
  { id: "scouts", label: "Total Scouts", value: 3, icon: "radar" },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    name: "David Nkemdirim",
    serviceType: "Mechanic",
    dateAdded: "2024-04-05",
  },
  { id: "2", name: "Chidi Eze", serviceType: "Scout", dateAdded: "2024-04-01" },
  {
    id: "3",
    name: "Grace Adeyemi",
    serviceType: "Mechanic",
    dateAdded: "2024-03-22",
  },
  {
    id: "4",
    name: "Roadside Angels",
    serviceType: "Towing",
    dateAdded: "2024-03-15",
  },
  {
    id: "5",
    name: "Mohammed Al-Rashid",
    serviceType: "Mechanic",
    dateAdded: "2024-03-10",
  },
  {
    id: "6",
    name: "EcoShine Detail Center",
    serviceType: "Car Wash",
    dateAdded: "2024-03-01",
  },
  {
    id: "7",
    name: "SpeedWash Pro",
    serviceType: "Car Wash",
    dateAdded: "2024-02-14",
  },
  {
    id: "8",
    name: "Fatima Aliyu",
    serviceType: "Scout",
    dateAdded: "2024-02-12",
  },
  {
    id: "9",
    name: "Highway Rescue NG",
    serviceType: "Towing",
    dateAdded: "2024-02-05",
  },
  {
    id: "10",
    name: "Sarah Chen",
    serviceType: "Mechanic",
    dateAdded: "2024-02-03",
  },
];
