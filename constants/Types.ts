export interface LoginData {
  email: string;
  password: string;
}

// State type
export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: any;
}

// Action types
export type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: any } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: any };

export type Industry = {
  id: number;
  name_en: string;
  name_ar: string; // Include if you plan to use Arabic names as well
  created_at: null | string;
  updated_at: null | string;
};
