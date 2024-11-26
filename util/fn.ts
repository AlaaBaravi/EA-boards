import { Colors } from "@/constants/Colors";
import Toast from "react-native-root-toast";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyALBvB0SHMQXa0IGf_sI-2ewEzPlhwg2xk");

export async function uriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

export const showToast = (message: string, type: "success" | "danger") => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    backgroundColor:
      type === "danger" ? Colors.light.danger : Colors.light.primary,
    opacity: 1,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
  });
};

export const showTime = (value: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(value);
};

export const formatTime = (value: Date): string => {
  const hours = value.getHours().toString().padStart(2, "0");
  const minutes = value.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num % 1000 === 0) {
    return (num / 1000).toString() + "K";
  } else {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
};

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await Geocoder.from(latitude, longitude);
    const address = response.results[0].formatted_address;
    console.log("Address:", address);
    return address;
  } catch (error) {
    console.error("Error getting address:", error);
  }
};
