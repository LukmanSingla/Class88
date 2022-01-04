import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

import AppLoading from "expo-app-loading";
import { DarkTheme } from "@react-navigation/native";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      darkTheme: true,
      name: "adsdas",
      profileImg:
        "https://lh3.googleusercontent.com/a/AATXAJw5MDMHWgAw6OmOuayf8cYQ0PcDAFgqWrWfpG-m=s96-c",
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  fetchUser = async () => {
    var theme, name, img;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        alert(snapshot.val().current_theme);
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        img = snapshot.val().profile_picture;
      });
    this.setState({
      darkTheme: theme === "dark" ? true : false,
      name: name,
      profileImg: img,
    });
  };
  componentDidMount() {
    this._loadFontsAsync();
    // this.fetchUser();
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Storytelling App</Text>
            </View>
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: this.state.profileImg }}
                style={styles.profilePic}
              ></Image>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{this.state.name}</Text>
            </View>
            <View style={styles.themeContainer}>
              <Text>Dark Theme</Text>
              {/* <Switch
                trackColor={{ false: "#767577", true: "#ffffff" }}
                thumbColor={this.state.darkTheme ? "#ee8249" : "#f4f3f4"}
                onValueChange={() => {
                  this.toggleSwitch();
                }}
                value={this.state.darkTheme}
              ></Switch> */}
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
});
