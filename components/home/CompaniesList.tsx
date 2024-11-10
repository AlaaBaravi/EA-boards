import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { mainstyles } from "@/constants/Styles";
import { getCompanies } from "@/util/https";
import { Company } from "@/constants/Types";
import CompanyCard from "../ui/CompanyCard";
import { Colors } from "@/constants/Colors";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return <ActivityIndicator size={"large"} color={Colors.light.primary} />;

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
