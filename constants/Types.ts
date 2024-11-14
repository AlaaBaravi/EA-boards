import { FontAwesome } from "@expo/vector-icons";

export interface TabOption {
  name: string;
  label: string;
  icon: keyof typeof FontAwesome.glyphMap;
}

export interface User {
  email: string;
  name: string;
  type: "individual" | "company";
}

export interface UserProfile {
  id: number;
  name: string;
  username: string | undefined;
  phone: string;
  email: string;
  token: string;
  fcm_token: undefined;
  industry_type_id: number | undefined;
  type: "company" | "individual";
  description: string | undefined;
  business_size: string | undefined;
  location: string | undefined;
  verify_admin: string;
  image: string;
  favorites: [];
  files: [];
}

export interface LoginData {
  email: string;
  password: string;
}

// State type
export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: UserProfile | null;
}

// Action types
export type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: any } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: any };

export type Industry = {
  id: number;
  name_en: string;
  name_ar: string;
  created_at: null | string;
  updated_at: null | string;
};

export type BillboardType = {
  id: number;
  text_en: string;
  text_ar: string;
  created_at: null;
  updated_at: null;
};

export type Region = {
  id: number;
  name_en: string;
  name_ar: string;
  image: string;
  created_at: null;
  updated_at: null;
};

export type Company = {
  id: number;
  image: string;
  name: string;
  phone: string;
  email: string;
  max_booking_days: number;
  min_booking_days: number;
  numbers_billboards: number;
};

export type File = {
  id: number;
  path: string;
  type: string;
};

export type Billboard = {
  availability: string;
  billboard_type_id: BillboardType;
  company: Company;
  description: any;
  end_date_crowded: null;
  files: Array<File>;
  id: number;
  kind: string;
  location: string;
  name: null;
  price_on_crowded: null;
  price_on_regular: null;
  region: Region;
  reviews: null;
  start_date_crowded: null;
  status: string;
  title: string;
  video_length: null;
  video_repetition: null;
  number_booking_day: null;
};

export type info = {
  created_at: null;
  id: number;
  text_ar: string;
  text_en: string;
  title_ar: string;
  title_en: string;
  updated_at: null;
};

export interface GetBillboardsParams {
  region_id?: string;
  billboard_type_id?: string;
  company_id?: string;
  kind?: string;
  start_time?: string;
  end_time?: string;
  page?: number;
  length?: number;
}
