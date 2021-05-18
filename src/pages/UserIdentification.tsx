import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Button } from "../Components/Button";

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");

  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate("Confirmation");
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{!name ? "😃" : "😄"}</Text>
                <Text style={styles.title}>Como podemos{"\n"}chamar você?</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || !!name) && { borderColor: colors.green },
                ]}
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                value={name}
                onChangeText={setName}
              />

              <View style={styles.footer}>
                <Button
                  title="Confirmar"
                  disabled={!name}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 54,
  },
  header: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 40,
    padding: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 24,
  },
  footer: {
    marginTop: 40,
    marginBottom: 16,
    width: "100%",
    paddingHorizontal: 20,
  },
});
