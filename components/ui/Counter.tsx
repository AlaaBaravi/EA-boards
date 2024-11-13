import { mainstyles } from "@/constants/Styles";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Counter = ({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (newValue: number) => void;
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 4,
  },
  label: {
    flex: 1,
    ...mainstyles.caption,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(187, 255, 209, 0.8)",
    elevation: 1,
    borderRadius: 24,
    padding: 8,
    gap: 3,
  },
  button: {
    elevation: 1,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
  },
  buttonText: {
    ...mainstyles.title2,
  },
  valueContainer: {
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  valueText: {
    ...mainstyles.caption,
  },
});
