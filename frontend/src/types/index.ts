export type HouseType = 'FLAT' | 'GROUND_FLOOR' | 'KUTCHA' | 'PUCCA';

export interface Address {
  id?: number;
  state: string;
  district: string;
  subDistrict?: string;
  city: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface HouseholdProfile {
  id?: number;
  adults: number;
  children: number;
  elderly: number;
  pets: number;
  disabilities: boolean;
  houseType: HouseType;
  floodProneHistory: boolean;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  role: string;
  address?: Address;
  householdProfile?: HouseholdProfile;
}

export interface WeatherSnapshot {
  tempC: number;
  rainfallMm: number;
  windKph: number;
  humidity: number;
  severityLevel: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';
  description: string;
}

export interface Alert {
  id: string;
  regionCode: string;
  severity: 'ADVISORY' | 'WATCH' | 'WARNING' | 'EMERGENCY';
  message: string;
  issuedAt: string;
  expiresAt: string;
}

export interface PreparednessItem {
  id: string;
  category: 'Home' | 'Food' | 'Medical' | 'Electricity' | 'Travel' | 'Documents';
  item: string;
  whyItMatters: string;
  done: boolean;
}

export interface SafetyPoint {
  id: number;
  type: 'SHELTER' | 'FOOD_SUPPLY' | 'MEDICAL';
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  currentStatus: 'OPEN' | 'FULL' | 'CLOSED';
  contactPhone: string;
  verifiedBy: string;
  lastUpdated: string;
  state: string;
  district: string;
  subDistrict?: string;
}

export interface DonationDrive {
  id: number;
  state: string;
  ngoName: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  paymentLink: string;
  verificationDocUrl: string;
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'CLOSED';
}
