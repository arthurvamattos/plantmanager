import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

export const PlantCardSecondary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={50} height={50} />
      <Text style={styles.title}>{data.name}</Text>
      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regar às</Text>
        <Text style={styles.time}>{data.hour}</Text>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 6,
  },
  title: {
    color: colors.heading,
    fontSize: 17,
    fontFamily: fonts.heading,
    marginVertical: 16,
    flex: 1,
  },
  details: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 13,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  timeLabel: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: fonts.complement,
    color: colors.body_light,
  },
});
