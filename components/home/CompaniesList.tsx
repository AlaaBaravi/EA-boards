import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useCompanies } from "@/hooks/info/useCompanies";
import { mainstyles } from "@/constants/Styles";

import CompanyCard from "@/components/ui/CompanyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const CompaniesList = () => {
  const { data: companies, isPending, error } = useCompanies();

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <View style={{ gap: 16 }}>
      <Text style={mainstyles.title1}>Companies</Text>
      <FlatList
        horizontal
        data={companies}
        renderItem={({ item }) => <CompanyCard company={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CompaniesList;

const styles = StyleSheet.create({});
