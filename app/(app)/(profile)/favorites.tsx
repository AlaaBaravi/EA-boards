import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import FavoriteCard from "@/components/profile/FavoriteCard";
import { mainstyles } from "@/constants/Styles";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";
import Empty from "@/components/ui/Empty";

const favorites = () => {
  const { data, isPending, error } = useUserProfile();

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <>
      {data.favorites.length === 0 ? (
        <Empty text="You don't have any favorites, Start adding some.">
          <CustomButton
            title="Check billboards list"
            onPress={() => router.replace("/(app)/(tabs)/billboards")}
          />
        </Empty>
      ) : (
        <FlatList
          style={mainstyles.container}
          data={data.favorites}
          renderItem={({ item }) => <FavoriteCard billboard={item.billboard} />}
          keyExtractor={(item) => item.billboard.id.toString()}
        />
      )}
    </>
  );
};

export default favorites;
