import { AuthAction, AuthState } from "@/constants/Types";
import { createContext, ReactNode, useContext, useReducer } from "react";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  user: null,
};

// Context types
interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Create context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
