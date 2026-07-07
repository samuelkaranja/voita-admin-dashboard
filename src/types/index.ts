export type ServiceType = "Mechanic" | "Car Wash" | "Towing" | "Scout";
export type VehicleType = "Flatbed" | "Roadside" | "Heavy Duty";
export type TowingAvailability = "Available" | "Busy";
export type CtaType = "Book Scout" | "Quick Request" | "Schedule Valet";
export type ScoutCategory = "Auditors" | "Valet" | "Drivers" | "Diagnostics";

export type SpecialtyCategory =
  | "Engine"
  | "Electrical"
  | "Bodywork"
  | "Transmission"
  | "Suspension";

export interface Mechanic {
  id: string;
  name: string;
  avatarUrl: string;
  address: string;
  primarySpecialty: string;
  specialtyCategory: SpecialtyCategory;
  specialties: string[];
  description: string;
  rating: number;
  verified: boolean;
  availableToday: boolean;
  dateAdded: string;
  services: MechanicService[];
  insurancePartners: InsurancePartner[];
}

export interface MechanicService {
  id: string;
  label: string;
  iconKey: string;
  description: string;
  highlighted: boolean;
}

export interface InsurancePartner {
  id: string;
  name: string;
  logoUrl: string;
}

export interface CarWash {
  id: string;
  name: string;
  avatarUrl: string;
  area: string;
  address: string;
  description: string;
  rating: number;
  waitTimeMins: number;
  verified: boolean;
  tags: string[];
  dateAdded: string;
  services: CarWashService[];
}

export interface CarWashService {
  id: string;
  label: string;
  iconKey: string;
  description: string;
  price: number;
  premium: boolean;
}

export interface TowingProvider {
  id: string;
  name: string;
  avatarUrl: string;
  vehicleType: VehicleType;
  etaMinMins: number | null;
  etaMaxMins: number | null;
  availability: TowingAvailability;
  isPartner: boolean;
  rating: number;
  phoneNumber: string;
  description: string;
  tags: string[];
  dateAdded: string;
  detailedServices: TowingDetailedService[];
  quickServices: TowingQuickService[];
}

export interface TowingDetailedService {
  id: string;
  label: string;
  iconKey: string;
  description: string;
  highlighted: boolean;
}

export interface TowingQuickService {
  id: string;
  label: string;
  iconKey: string;
}

export interface Scout {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  category: ScoutCategory;
  bio: string;
  location: string;
  ctaType: CtaType;
  accentColor: string;
  rating: number;
  missionsCompleted: number;
  verified: boolean;
  dateAdded: string;
  tags: string[];
  skills: ScoutSkill[];
  reviews: ScoutReview[];
}

export interface ScoutSkill {
  id: string;
  label: string;
  iconKey: string;
  subtitle: string;
}

export interface ScoutReview {
  id: string;
  reviewerName: string;
  avatarUrl?: string;
  rating: number;
  comment: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface StatCardData {
  id: string;
  label: string;
  value: number;
  icon: "wrench" | "droplet" | "truck" | "radar";
}

export interface ActivityItem {
  id: string;
  name: string;
  serviceType: ServiceType;
  dateAdded: string; // ISO string
}

export interface SidebarLinkData {
  label: string;
  href: string;
  icon: "grid" | "wrench" | "droplet" | "truck" | "radar";
}
