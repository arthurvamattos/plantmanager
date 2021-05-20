import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { Header } from "../components/Header";

import waterDrop from "../assets/waterdrop.png";
import colors from "../styles/colors";
import { loadPlant, PlantProps } from "../libs/storage";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FlatList } from "react-native-gesture-handler";
import fonts from "../styles/fonts";
import { PlantCardSecondary } from "../components/PlantCardSecondary";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

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
          renderItem={({ item }) => <PlantCardSecondary data={item} />}
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
