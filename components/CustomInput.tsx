import { Colors } from "@/constants/Colors";
import React, { useState, useRef } from "react";
import {
  Animated,
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  useColorScheme,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  autoCapitalize,
  ...props
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedPlaceholder = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme() ?? "light";

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedPlaceholder, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedPlaceholder, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const animatedStyle = {
    top: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0.5],
    }),
    fontSize: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color:
      isFocused || value
        ? theme === "light"
          ? "#7abbea"
          : "white"
        : "#7abbea",
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.floatingLabelContainer,
          isFocused && styles.focusedLabelContainer,
        ]}
      >
        <Animated.Text
          style={[
            styles.floatingLabel,
            animatedStyle,
            {
              backgroundColor: isFocused
                ? theme === "light"
                  ? "white"
                  : "#2C3E50"
                : "transparent",
            },
          ]}
        >
          {isFocused ? placeholder : ""}
        </Animated.Text>
      </View>

      <TextInput
        style={[
          styles.input,
          theme === "light" ? styles.lightInput : styles.darkInput,
          isFocused && styles.focusedInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused ? "" : placeholder}
        autoCapitalize={autoCapitalize}
        {...props}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingTop: 10,
    marginBottom: 20,
  },
  floatingLabel: {
    // position: "absolute",
    // left: 10,
    // top: 0,
    paddingHorizontal: 5,
    // zIndex: 100,
    borderRadius: 20,
  },
  input: {
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1.5,
  },
  focusedLabelContainer: {
    top: 1,
  },

  floatingLabelContainer: {
    position: "absolute",
    left: 10,
    top:0,
    zIndex: 100,
  },
  lightInput: {
    borderColor: "#BDC3C7", // Light gray for light theme
    backgroundColor: "#ECF0F1", // Soft light background
  },
  darkInput: {
    borderColor: "#34495E", // Dark border for dark theme
    backgroundColor: "#2C3E50", // Dark input background
    color: Colors.dark.text,
  },
  focusedInput: {
    borderColor: "#7abbea",
  },
});
