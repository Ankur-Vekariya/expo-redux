import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addProduct } from "@/redux/actions/product";
import { Link, router } from "expo-router";
import { theme } from "@/utils/theme";

function TabTwoScreen(props) {
  const [productList, setProductList] = useState([]);
  const getProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("data-------------------", data.products[0]);
        setProductList(data.products);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  function ProductCard({ item }) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          flex: 1,
          flexDirection: "column",
          marginHorizontal: 6,
          marginVertical: 10,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
        onPress={() => {
          router.push(`/productDetail/${item.id}`);
        }}
      >
        <View
          style={{
            // backgroundColor: "#E5E4E2",
            backgroundColor: theme.light,

            borderRadius: 20,
            minHeight: 150,
          }}
        >
          <Image
            style={[styles.imageThumbnail, { height: 150 }]}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View style={{ padding: 5 }}>
          <View style={{ marginTop: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: 700 }} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 12 }} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <View style={{ marginTop: 4, flexDirection: "row" }}>
            {Array.from({
              length: parseInt(
                (item.reviews[0].rating +
                  item.reviews[1].rating +
                  item.reviews[2].rating) /
                  3
              ),
            }).map((star, index) => (
              <View
                style={{
                  marginHorizontal: 1,
                  marginBottom: 10,
                }}
              >
                <AntDesign name="star" size={16} color={theme.light} />
              </View>
            ))}
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -10,
              right: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.add(item);
              }}
            >
              <AntDesign name="pluscircle" size={36} color={theme.dark} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productList}
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.cart.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add: (name) => {
      dispatch(addProduct(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabTwoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  arrangeProductsBar: {
    flexDirection: "row",
    paddingVertical: 14,
    backgroundColor: "#fafafa",
    borderBottomColor: "#dfe4ea",
    borderBottomWidth: 1,
  },
  arrangeProductsBarItemOpacity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrangeProductsBarItemLabel: {
    marginHorizontal: 10,
    fontFamily: "SSRegular",
    fontSize: 20,
  },
  iconCountView: {
    position: "absolute",
    zIndex: 2,
    right: -4,
    top: -4,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "red",
  },
  iconCountText: { color: "#fff", fontWeight: "bold", fontFamily: "SSBold" },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    // height: 100,
  },
});
