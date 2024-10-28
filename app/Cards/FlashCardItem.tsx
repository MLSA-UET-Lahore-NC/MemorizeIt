import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
interface FlashcardItemProps {
  question: string;
  answer: string;
}
const FlashCardItem = ({ question, answer }:FlashcardItemProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePress = () => setIsFlipped(!isFlipped);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.card, isFlipped && styles.cardBack]}>
      <Text style={styles.text}>{isFlipped ? answer : question}</Text>
    </TouchableOpacity>
  );
};

export default FlashCardItem;

const styles = StyleSheet.create({
  card: {
    minHeight: 280, 
    width:250,
    alignSelf:'center',
    backgroundColor: "#218bd8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    padding: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  cardBack: {
    backgroundColor: "#34D399", // Different color for the back of the card
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
