import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const ResultsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const correctAnswer = route.params.answers.filter(
    (answer: any) => answer.answer === true
  ).length;
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <LinearGradient
        // Button Linear Gradient
        style={{ height: "100vh", padding: 10 }}
        colors={["#1488cc", "#2b32b2"]}
      >
        {/* <View
                style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 30
                }}
            >
                <Text style={{color: '#ffffff'}}>Your Results</Text>
                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 14,
                }}
                >
                    <Text style={{color: '#ffffff', marginRight: 8}}>Share</Text>
                    <AntDesign
                        name="sharealt"
                        size={18}
                        color="white"
                    />
                </View>
            </View> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
            paddingTop: 30,
          }}
        >
          <Text style={{ color: "#ffffff" }}>Correct answers</Text>
          <Text style={{ color: "#ffffff" }}>({correctAnswer}/5)</Text>
        </View>

        <Pressable
          style={{
            backgroundColor: "white",
            minHeight: "70vh",
            maxHeight: "70vh",
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
            Score Card
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
