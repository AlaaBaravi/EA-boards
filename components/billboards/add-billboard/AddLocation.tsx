import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

import CustomButton from "@/components/ui/CustomButton";
import { getAddressFromCoords } from "@/util/fn";

interface AddLocationProps {
  onNextStep: (pickedlocation: string) => void;
}

const AddLocation: FC<AddLocationProps> = ({ onNextStep }) => {
  const [position, setPosition] = useState<LatLng>({
    latitude: 25.2048,
    longitude: 55.2708,
  });

  const [region, setRegion] = useState<Region>({
    latitude: 25.2048,
    longitude: 55.2708,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handlePlaceSelect = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setPosition({ latitude: lat, longitude: lng });
      setRegion({ ...region, latitude: lat, longitude: lng });
    } else {
      console.log("Failed to fetch location details.");
    }
  };

  const handleSubmit = async () => {
    const location = await getAddressFromCoords(
      position.latitude,
      position.longitude
    );

    if (location) {
      onNextStep(location);
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => handlePlaceSelect(data, details)}
        query={{
          key: "AIzaSyALBvB0SHMQXa0IGf_sI-2ewEzPlhwg2xk",
          language: "en",
          components: "country:ae",
        }}
        styles={{
          textInput: styles.textInput,
          container: styles.inputContainer,
        }}
      />

      <MapView style={styles.map} initialRegion={region} region={region}>
        <Marker
          draggable
          coordinate={position}
          onDragEnd={(e) =>
            setPosition({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
          image={require("@/assets/images/custom-pin.png")}
        />
      </MapView>

      <View style={styles.nextButton}>
        <CustomButton title="Next" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textInput: {
    backgroundColor: "#F1FFF6",
    height: 48,
    borderRadius: 8,
    elevation: 6,
  },
  inputContainer: {
    width: "90%",
    zIndex: 1,
    flex: 0.5,
    position: "absolute",
    marginTop: 12,
  },
  nextButton: { position: "absolute", bottom: 12, width: "90%", zIndex: 1 },
});
