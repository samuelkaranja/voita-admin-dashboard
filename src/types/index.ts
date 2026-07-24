export type UserRole = "driver" | "admin" | "super_admin";
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

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

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
  verified: boolean;
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

export interface ScoutTag {
  id: string;
  label: string;
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
  tags: ScoutTag[];
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
  icon:
    | "grid"
    | "wrench"
    | "droplet"
    | "truck"
    | "radar"
    | "userCheck"
    | "messageSquare";
}

export type RoomType = "general" | "brand";

export interface CommunityRoom {
  id: string;
  name: string;
  type: RoomType;
  memberCount: number;
  pendingRequestCount: number;
  iconUrl: string | null;
  brandSlug?: string | null;
  description?: string | null;
  rulesText?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface JoinRequest {
  id: string;
  roomId: string;
  roomName: string;
  userId: string;
  userName: string;
  requestedAt: string;
}

export interface RoomMember {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  isModerator: boolean;
  joinedAt: string;
}

export interface PaginatedMembers {
  members: RoomMember[];
  total: number;
  page: number;
  pageSize: number;
}
