import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";

import { Screen } from "../components/Screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "react-native-elements";
import React from "react";

export function CategoryScreen() {
  const navigation = useNavigation<any>();

  const [topic, onChangeTopic] = React.useState("");
  const [numberOfQuestion, onChangeNumberOfQuestion] = React.useState<number>();

  const gotoQuiz = () => {
    if (numberOfQuestion && isNaN(numberOfQuestion as number)) {
      return;
    }
    navigation.navigate("Quiz", {
      topic: topic,
      numberOfQuestion: numberOfQuestion,
    });
  };
  return (
    <Screen>
      <LinearGradient
        // Button Linear Gradient
        style={{ minHeight: "96vh", padding: "20px", paddingTop: "50px" }}
        colors={["#1488cc", "#2b32b2"]}
      >
        <View></View>
        <View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Please choose your favorite topic!
            </Text>
          </View>

          <View>
            <Text style={{ color: "#fff", fontSize: 14, marginLeft: 12 }}>
              Topic:
            </Text>
            <TextInput
              placeholder="Ex: VietNam"
              style={styles.input}
              onChangeText={onChangeTopic}
              value={topic}
            />
          </View>

          <View>
            <Text style={{ color: "#fff", fontSize: 14, marginLeft: 12 }}>
              Number of question:
            </Text>
            <TextInput
              placeholder="Ex: 4"
              style={styles.input}
              onChangeText={onChangeNumberOfQuestion}
              value={numberOfQuestion}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View>
          <Pressable
            onPress={gotoQuiz}
            style={{
              backgroundColor: "#ffffff",
              padding: 14,
              width: "100%",
              borderRadius: 10,
              marginTop: 30,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "#0072ff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Ready
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* </ScrollView> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 42,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    color: "#ddd",
    borderRadius: 6,
  },
});
