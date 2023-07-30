import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";
import StackNavigator from "./screens/StackNavigator";
import { ThemeProvider } from 'react-native-elements';

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <ThemeProvider>
        <StackNavigator />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
