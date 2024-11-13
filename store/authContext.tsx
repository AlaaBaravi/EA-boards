import { AuthAction, AuthState } from "@/constants/Types";
import { getProfile } from "@/util/https";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

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

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  isLoading: boolean | undefined;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          const user = await getProfile(token);
          if (user) {
            dispatch({
              type: "LOGIN",
              payload: { token, user },
            });
          } else {
            console.error("Failed to fetch user data.");
          }
        } else {
          // No token found, user is not logged in
          console.log("No token found, user is not logged in.");
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, isLoading }}>
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
