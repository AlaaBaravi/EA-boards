import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/util/https";
import { UserProfile } from "@/constants/Types";
import { useAuth } from "@/store/authContext";

export function useUserProfile() {
  const { state } = useAuth();

  return useQuery<UserProfile, Error>({
    queryKey: ["userData", state.token],
    queryFn: () => getProfile(state.token!),
    staleTime: 0,

    enabled: !!state.token,
  });
}
