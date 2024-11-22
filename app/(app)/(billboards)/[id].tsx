import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import CompanyBillboardDetails from "@/components/billboards/CompanyBillboardDetails";
import CustomerBillboardDetails from "@/components/billboards/CustomerBillboardDetails";

const BillboardDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: userProfile, isPending, error } = useUserProfile();
  const myId = Array.isArray(id) ? id[0] : id;

  if (isPending) {
    <Loading />;
  }

  if (error) {
    <Error errorMessage={error.message} />;
  }

  return (
    <>
      {userProfile?.type === "company" ? (
        <CompanyBillboardDetails myId={myId} />
      ) : (
        <CustomerBillboardDetails myId={myId} />
      )}
    </>
  );
};

export default BillboardDetails;
