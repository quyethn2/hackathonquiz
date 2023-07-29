import {
  Text,
  FlatList,
  View,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const features = [
    "tailwind",
    "recoil",
    "native styling",
    "fetching code from an API",
    "using a FlatList to render data",
    "Image for both remote & local images",
    "custom fonts",
    "sign a transaction / message",
    "theme hook with light/dark support",
  ];

  return (
    <Screen>
      <LinearGradient
        // Button Linear Gradient
        style={{ minHeight: "96vh", padding: "20px", paddingTop: "50px" }}
        colors={["#1488cc", "#2b32b2"]}
      >
        <View>
          <Image
            source={require("../../assets/3D-Man.png")}
            style={{
              height: 200,
              width: "100%",
              marginTop: 15,
              resizeMode: "contain",
            }}
          />
        </View>
        <View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              <View style={{ marginTop: 20 }}>
                Do you feel confident? Here you'll challenge one of our most
                difficult questions!
              </View>
            </Text>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => navigation.navigate("Quiz")}
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
              Start Quiz
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
});
