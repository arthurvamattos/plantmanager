import React, { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { formatDistance } from "date-fns";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { loadPlant, PlantProps, removePlant } from "../libs/storage";

import { Header } from "../components/Header";
import { PlantCardSecondary } from "../components/PlantCardSecondary";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import waterDrop from "../assets/waterdrop.png";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) =>
              oldData?.filter((item) => item.id !== plant.id)
            );
          } catch {
            Alert.alert("Não foi possível remover 😥");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStoregedData() {
      const plantsStoreged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoreged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWaterd(`Regue sua ${plantsStoreged[0].name} daqui a ${nextTime}`);

      setMyPlants(plantsStoreged);
      setLoading(false);
    }

    loadStoregedData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    padding: 16,
    borderRadius: 20,
    height: 88,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  spotlightImage: {
    width: 56,
    height: 56,
  },
  spotlightText: {
    flex: 1,
    marginLeft: 24,
    color: colors.blue,
    fontFamily: fonts.text,
    lineHeight: 23,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginBottom: 24,
  },
});
