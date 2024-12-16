import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";
import styles from "./styles";

const Log = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const logo = require("./img/logo.png");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.6:8080/phpnativesampleapi/api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok && data.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        setLoggedIn(true);
      } else {
        Alert.alert(
          "Login Failed",
          data.message || "Invalid username or password"
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Something went wrong, please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.6:8080/phpnativesampleapi/api/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Signup Success", data.message);
        setLoggedIn(true);
      } else {
        Alert.alert("Signup Failed", data.message);
      }
    } catch (error) {
      Alert.alert("Signup Failed", "Email already existed");
    }
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("user");
    setLoggedIn(false);
  };

  if (loggedIn) {
    return <Home onLogout={handleLogout} />;
  }

  return (
    <View style={styles.formWrapper}>
      <Image source={logo} style={styles.logo} />

      <View style={styles.form}>
        {isLogin ? (
          <>
            <Text style={styles.heading}>Login</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputTextBox}>
                <Icon
                  name="user"
                  size={20}
                  color="#01c289"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputTextBox}>
                <Icon
                  name="lock"
                  size={20}
                  color="#01c289"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPasswordLogin}
                  placeholder="Enter password"
                />
                <TouchableOpacity
                  onPress={() => setShowPasswordLogin(!showPasswordLogin)}
                  style={styles.passwordToggle}
                >
                  <Icon
                    name={showPasswordLogin ? "eye" : "eye-slash"}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={styles.switchText}>New to UBayanihan? Sign Up</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.heading}>Signup</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputTextBox}>
                <Icon
                  name="user"
                  size={20}
                  color="#01c289"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Create username"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputTextBox}>
                <Icon
                  name="envelope"
                  size={20}
                  color="#01c289"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputTextBox}>
                <Icon
                  name="lock"
                  size={20}
                  color="#01c289"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPasswordSignup}
                  placeholder="Create password"
                />
                <TouchableOpacity
                  onPress={() => setShowPasswordSignup(!showPasswordSignup)}
                  style={styles.passwordToggle}
                >
                  <Icon
                    name={showPasswordSignup ? "eye" : "eye-slash"}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text style={styles.switchText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Log;
