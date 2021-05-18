import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Button } from "../Components/Button";

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😁</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>
          {" "}
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button title="Começar" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  emoji: {
    textAlign: "center",
    fontSize: 96,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 16,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 16,
    color: colors.heading,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 75,
    marginTop: 24,
  },
});
