import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { useUpdateFavorites } from "@/hooks/user/useUpdateFavorites";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Favorite = ({ id }: { id: string }) => {
  const {
    data: userData,
    isPending: isUserData,
    error: userDataError,
  } = useUserProfile();

  const { mutate: updateFavoritesMutation, isPending: isUpdating } =
    useUpdateFavorites();

  if (isUserData) return <Loading />;
  if (userDataError) return <Error errorMessage={userDataError.message} />;

  const isFavorite =
    userData.favorites.findIndex((fav) => fav.billboard.id === Number(id)) !==
    -1;

  const handleFavorite = () => {
    if (isFavorite) {
      updateFavoritesMutation({ billboard_id: Number(id), remove: 1 });
    } else {
      updateFavoritesMutation({ billboard_id: Number(id) });
    }
  };

  return (
    <Ionicons
      name={isFavorite ? "heart" : "heart-outline"}
      size={24}
      color={Colors.light.danger}
      onPress={handleFavorite}
      disabled={isUpdating}
    />
  );
};

export default Favorite;

const styles = StyleSheet.create({});
