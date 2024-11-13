import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/util/https";
import { UserProfile } from "@/constants/Types";
import { useAuth } from "@/store/authContext";

export function useUserProfile() {
  const { state } = useAuth();

  return useQuery<UserProfile, Error>(
    ["userData", state.token],
    () => getProfile(state.token!),
    {
      enabled: !!state.token,
    }
  );
}
