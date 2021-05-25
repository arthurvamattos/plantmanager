import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Feather } from "@expo/vector-icons";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export const PlantCardSecondary = ({
  data,
  handleRemove,
  ...rest
}: PlantProps) => {
  return (
    <Swipeable
      overshootRight={false}
      rightThreshold={80}
      overshootFriction={40}
      renderRightActions={() => (
        <Animated.View>
          <RectButton style={styles.buttonRemove} onPress={handleRemove}>
            <Feather name="trash" size={24} color={colors.white} />
          </RectButton>
          <View style={styles.buttonRemoveHelper} />
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,

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
  buttonRemove: {
    width: 80,
    height: 80,
    backgroundColor: colors.red,
    marginTop: 6,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  buttonRemoveHelper: {
    backgroundColor: colors.red,
    width: 80,
    height: 80,
    position: "relative",
    bottom: 80,
    right: 60,
    zIndex: 1,
  },
});
