import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { mainstyles } from "@/constants/Styles";
import { useBillboards } from "@/hooks/info/useBillboards";

import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import BookingCard from "@/components/booking/BookingCard";
import { useState } from "react";
import { Billboard } from "@/constants/Types";
import CompleteBookingModal from "@/components/booking/CompleteBookingModal";

const height = Dimensions.get("window").height;

const FilteredBillboards = () => {
  const [forBookings, setForBookings] = useState<Billboard[]>([]);

  const {
    billboard_type_id: billboardTypeID,
    company_id: companyId,
    kind: billboardKind,
    region_id: regionId,
  } = useLocalSearchParams();

  const {
    data: filteredBillboards,
    isPending,
    error,
  } = useBillboards({
    company_id: [companyId.toString()],
    billboard_type_id: [billboardTypeID.toString()],
    kind: billboardKind.toString(),
    region_id: [regionId.toString()],
  });

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  const handleForBookings = (billboard: Billboard) => {
    const isPressed =
      forBookings.findIndex((item) => item.id === billboard.id) !== -1;

    if (isPressed) {
      setForBookings((prev) => prev.filter((item) => item.id !== billboard.id));
    } else {
      setForBookings((prev) => [...prev, billboard]);
    }
  };

  const handleCancel = () => {
    setForBookings([]);
  };

  const isVisible = forBookings.length > 0;

  return (
    <>
      <View
        style={[
          mainstyles.container,
          { marginTop: isVisible ? height * 0.2 : 0 },
        ]}
      >
        {filteredBillboards.length === 0 ? (
          <Empty text="There is no billboards matches your filters" />
        ) : (
          <FlatList
            data={filteredBillboards}
            renderItem={({ item }) => (
              <BookingCard
                billboard={item}
                forBookings={forBookings}
                onForBookings={handleForBookings}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
      <CompleteBookingModal
        isVisible={isVisible}
        number={forBookings.length.toString()}
        company={filteredBillboards[0].company}
        onCancel={handleCancel}
      />
    </>
  );
};

export default FilteredBillboards;

const styles = StyleSheet.create({});
