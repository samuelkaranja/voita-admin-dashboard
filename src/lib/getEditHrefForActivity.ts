import { ActivityItem } from "@/types";

const SERVICE_TYPE_TO_PATH: Record<ActivityItem["serviceType"], string> = {
  Mechanic: "mechanics",
  "Car Wash": "car-wash",
  Towing: "towing",
  Scout: "scouts",
};

export function getEditHrefForActivity(item: ActivityItem): string {
  return `/${SERVICE_TYPE_TO_PATH[item.serviceType]}/edit/${item.id}`;
}
