export async function uriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

import { Colors } from "@/constants/Colors";
import Toast from "react-native-root-toast";

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
