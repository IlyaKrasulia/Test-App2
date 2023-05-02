import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import axios from "axios";
import { getData } from "./src/redux/slices/dataSlice";
import { Button } from "react-native";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.items);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const urlList = [
    "https://familyactivitiestestserver.germanywestcentral.cloudapp.azure.com/testimages/1.",
    "https://familyactivitiestestserver.germanywestcentral.cloudapp.azure.com/testimages/2.",
  ];

  useEffect(() => {
    const fechData = async () => {
      try {
        urlList.map(async (item) => {
          const response = await axios.get(item);
          dispatch(getData(response.data));
        });
      } catch (error) {
        console.log(error);
      }
    };
    fechData();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      {data &&
        data.map((item, index) => {
          return (
            <>
              <TouchableHighlight
                key={index}
                onPress={() => {
                  setPopupVisible(!popupVisible);
                  setSelectedItem(item);
                }}
              >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: item.imageUrl }}
                />
              </TouchableHighlight>

              {popupVisible && (
                <View style={styles.popup}>
                  <Image
                    style={{ width: 300, height: 300 }}
                    source={{ uri: selectedItem.imageUrl }}
                  />

                  <Text>{selectedItem.title}</Text>
                  <Text>{selectedItem.description}</Text>
                  <Button
                    onPress={() => setPopupVisible(false)}
                    title="close"
                  />
                </View>
              )}
            </>
          );
        })}
    </SafeAreaView>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#000",
    width: 50,
    height: 50,
  },
  popup: {
    backgroundColor: "#f03",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    left: 0,
    top: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
