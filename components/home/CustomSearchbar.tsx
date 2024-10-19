import { StyleSheet } from "react-native";
import { useState } from "react";
import { Searchbar } from "react-native-paper";

const CustomSearchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Searchbar
      mode="view"
      showDivider={false}
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{
        backgroundColor: "#F1FFF6",
        height: 48,
        borderRadius: 8,
      }}
      inputStyle={{ minHeight: 48 }}
    />
  );
};

export default CustomSearchbar;

const styles = StyleSheet.create({});
