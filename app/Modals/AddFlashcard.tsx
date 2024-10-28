import CustomInput from "@/components/CustomInput";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
export interface FlashcardType {
  question: string;
  answer: string;
}
interface AddFlashcardProps {
  addFlashcard: (card: FlashcardType) => void;
}
const AddFlashcard = ({ addFlashcard }: AddFlashcardProps) => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";

  // Format question with a capital letter and question mark if needed
  const formatQuestion = (text: string) => {
    if (!text) return text;
    const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
    return formattedText.endsWith("?") ? formattedText : `${formattedText}?`;
  };

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const saveFlashcard = () => {
    if (!question.trim() || !answer.trim()) {
      Alert.alert("Both question and answer are required.");
      return;
    }
    const newCard = {
      question: formatQuestion(question),
      answer: answer.charAt(0).toUpperCase() + answer.slice(1),
    };
    addFlashcard(newCard);
    setQuestion("");
    setAnswer("");
  };
  return (
    <>
      <View
        style={[
          styles.container,
          //   theme === "light" ? styles.lightBackground : styles.darkBackground,
        ]}
      >
        <ThemedText type="title" style={styles.title}>
          Add Flashcard
        </ThemedText>
        <View style={styles.form}>
          <CustomInput
            placeholder="Question"
            value={question}
            onChangeText={setQuestion}
            autoCapitalize="sentences"
          />
          <CustomInput
            placeholder="Answer"
            value={answer}
            onChangeText={setAnswer}
            autoCapitalize="sentences"
          />
        </View>
        <Pressable style={styles.saveBtn} onPress={saveFlashcard}>
          <ThemedText type="defaultSemiBold" style={styles.saveBtnText}>
            Save
          </ThemedText>
        </Pressable>
      </View>
    </>
  );
};

export default AddFlashcard;
const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    //   padding: 20,
    // justifyContent: "center",
  },
  lightBackground: {
    backgroundColor: Colors.light.background,
  },
  darkBackground: {
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#4A90E2",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D1D1",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  darkInput: {
    backgroundColor: "#2E2E2E",
    borderColor: "#3A3A3A",
    borderWidth: 1,
  },
  saveBtn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
