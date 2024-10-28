import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouter } from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AddFlashcard, { FlashcardType } from "../Modals/AddFlashcard";
import FlashCardItem from "../Cards/FlashCardItem";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlashCard = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  // Load flashcards from local storage on mount
  useEffect(() => {
    const loadFlashcards = async () => {
      const storedFlashcards = await AsyncStorage.getItem("flashcards");
      if (storedFlashcards) {
        setFlashcards(JSON.parse(storedFlashcards));
      } else {
        // Initialize with dummy data if no flashcards are found
        const initialCards = [
          {
            question: "What is React Native?",
            answer:
              "React Native (also known as RN) is a popular JavaScript-based mobile app framework that allows you to build natively-rendered mobile apps for iOS and Android.",
          },
          {
            question: "What is useState?",
            answer: "A React hook for managing state.",
          },
          {
            question: "What is TypeScript?",
            answer:
              "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
          },
        ];
        setFlashcards(initialCards);
        await AsyncStorage.setItem("flashcards", JSON.stringify(initialCards));
      }
    };
    loadFlashcards();
  }, []);

  // Save flashcards to local storage when the list changes
  useEffect(() => {
    const saveFlashcards = async () => {
      await AsyncStorage.setItem("flashcards", JSON.stringify(flashcards));
    };
    saveFlashcards();
  }, [flashcards]);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  const addFlashcard = (newCard: FlashcardType) => {
    setFlashcards((prevCards) => [...prevCards, newCard]);
    bottomSheetRef?.current?.close(); // Close the bottom sheet after saving
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          theme === "light" ? styles.lightBackground : styles.darkBackground,
        ]}
      >
        <View
          style={[
            styles.backIconView,
            // theme === "light" ? styles.lightBackground : styles.darkBackground,
          ]}
        >
          <Icon
            name="chevron-back-outline"
            size={30}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            onPress={() => router.back()}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            marginTop: 8,
            borderColor: "lightgrey",
          }}
        />
        <ThemedText type="title" style={styles.title}>
          Flashcards
        </ThemedText>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={flashcards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <FlashCardItem question={item.question} answer={item.answer} />
          )}
          contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => bottomSheetRef?.current?.expand()}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["50%", "50%"]}
          enablePanDownToClose
          // onChange={handleSheetChanges}
          enableDynamicSizing
        >
          <BottomSheetView style={styles.contentContainer}>
            <AddFlashcard addFlashcard={addFlashcard} />
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </>
  );
};

export default FlashCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "lightgrey",
  },
  title: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#4A90E2",
  },
  backIconView: {
    marginTop: 30,
    marginLeft: 10,
  },
  lightBackground: {
    backgroundColor: Colors.light.background,
  },
  darkBackground: {
    backgroundColor: Colors.dark.background,
  },
  flashcardsContainer: { marginTop: 20 },
  listContent: {
    paddingBottom: 100, // Add padding to avoid overlap with add button
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#134f7b",
    borderRadius: 50,
    padding: 15,
    zIndex: 10,
    elevation: 10, // for Android shadow
    shadowColor: "black", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
