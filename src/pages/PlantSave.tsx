import React, { useState } from "react";
import { format, isBefore } from "date-fns";
import { SvgFromUri } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/core";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimerPicker, { Event } from "@react-native-community/datetimepicker";

import { Button } from "../components/Button";

import { PlantProps, savePlant } from "../libs/storage";
import waterDrop from "../assets/waterdrop.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⌚");
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subTitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.",
        buttonTitle: "Muito obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possível salvar. 😥");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} width={156} height={176} />

        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterDrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha um melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimerPicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            onPress={handleOpenDateTimePickerForAndroid}
            style={styles.dateTimePickerButton}
          >
            <Text style={styles.dateTimePickerText}>
              {`Mudar ${format(selectedDateTime, "HH:mm")}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
    marginBottom: 24,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 32,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 16,
  },
  controller: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 32,
    paddingBottom: getBottomSpace() || 32,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 16,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 24,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    lineHeight: 23,
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 13,
    marginBottom: 32,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
