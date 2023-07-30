import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Confetti from "react-confetti";

const ResultsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const numberOfQuestion = route.params.numberOfQuestion;

  const correctAnswer = route.params.answers.filter(
    (answer: any) => answer.answer === true
  ).length;

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <Confetti recycle={false} tweenDuration={3000}></Confetti>
      <LinearGradient
        // Button Linear Gradient
        style={{
          minHeight: "calc(100vh - 20px)",
          maxHeight: "calc(100vh - 20px)",
          padding: 10,
        }}
        colors={["#1488cc", "#2b32b2"]}
      >
        <View>
          <Image
            source={require("../../assets/cup.png")}
            alt=""
            style={{
              height: 100,
              width: "100%",
              marginTop: 15,
              resizeMode: "contain",
            }}
          ></Image>
        </View>

        <Pressable
          style={{
            backgroundColor: "white",
            minHeight: "60vh",
            maxHeight: "60vh",
            borderRadius: 7,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#0072ff",
              fontSize: 15,
              fontWeight: "500",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Correct answers {correctAnswer}/ {numberOfQuestion || 4}
          </Text>
          <FlatList
            numColumns={2}
            data={route.params.answers}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{item.question}</Text>
                {item.answer === true ? (
                  <AntDesign
                    style={{ marginLeft: 5 }}
                    name="checkcircle"
                    size={20}
                    color="green"
                  />
                ) : (
                  <AntDesign
                    style={{ marginLeft: 5 }}
                    name="closecircle"
                    size={20}
                    color="red"
                  />
                )}
              </View>
            )}
          />
          <LinearGradient
            // Background Linear Gradient
            colors={["#73d13d", "#237804"]}
            style={{
              margin: 15,
              maxWidth: "100%",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              marginBottom: 15,
              elevation: 5,
            }}
          >
            <Pressable
              style={{ marginLeft: "auto", marginRight: "auto", padding: 15 }}
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Continue
              </Text>
            </Pressable>
          </LinearGradient>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({});
