import React from "react";
import { View, Image, Text } from "react-native";
import SignIn from "components/Authentication/SignIn";
import { Button } from "react-native-paper";
import GoogleSignIn from "components/Authentication/GoogleSignIn";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <View style={{ marginBottom: "20%" }}>
          <Image
            source={require("assets/AppLogo.png")}
            style={{ marginLeft: 10, height: 100, width: 100 }}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 6,
              }}
            >
              Welcome back!
            </Text>
            <Text style={{ color: "#909090" }}>
              Log in to your existant account of UCare
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <SignIn navigation={navigation} />
          <View style={{ height: 20 }}></View>
          <GoogleSignIn navigation={navigation} />
        </View>
        <View style={{ height: 70 }}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
          <Button
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            labelStyle={{ fontWeight: "bold" }}
          >
            Sign up
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
