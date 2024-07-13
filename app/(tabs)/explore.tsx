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

  function Product({ product }) {
    // console.log("length-", product.images[0]);
    console.log("length================", product.thumbnail);

    return (
      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 10,
          borderBottomColor: "#dfe4ea",
          borderBottomWidth: 1,
          paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {/* Product Image View */}
          <View style={{ flex: 1, paddingHorizontal: 8, borderWidth: 1 }}>
            <Image
              style={{ resizeMode: "center" }}
              source={{
                uri: "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png",
              }}
            />
          </View>
          {/* Product Details View */}
          <View style={{ flex: 3 }}>
            {/* -- Ratings View */}
            <View>
              {/* <Text style={{ fontFamily: "SSRegular" }}>{product.name}</Text> */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#fff200",
                    alignItems: "center",
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 4,
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#111",
                      marginRight: 8,
                      fontSize: 16,
                    }}
                  >
                    {product.rating}
                  </Text>
                  {/* <RNEIcon
                    name="star"
                    type="font-awesome"
                    size={12}
                    color={"#111"}
                  /> */}
                </View>
                <Text style={{ marginLeft: 6 }}>({product.ratingCount})</Text>
              </View>
            </View>
            {/* -- Price View */}
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 16 }}>
                {`₹${product.price}  `}
                <Text
                  style={{
                    color: "#57606f",
                    textDecorationLine: "line-through",
                  }}
                >
                  {product.actualPrice !== ""
                    ? `₹${product.actualPrice}`
                    : null}
                </Text>
                <Text
                  style={{ color: "green" }}
                >{`  ${product.discount}`}</Text>
              </Text>
            </View>
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 16 }}>{`₹${product.title}  `}</Text>
              <Text style={{ fontSize: 16 }} numberOfLines={2}>
                {`₹${product.description}  `}
              </Text>
            </View>
          </View>
        </View>
        {/* Offer View */}
        <View
          style={{
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <RNEIcon name="tag" type="font-awesome" size={16} /> */}
          <Text style={{ marginLeft: 10, fontSize: 16 }}>{product.offer}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="pluscircle" size={30} color="black" />
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="minuscircle" size={30} color="black" />
        </View>
        {/* Specifications Wrap */}
        {/* <View
          style={{
            marginTop: 4,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {product.specifications.map((spec) => (
            <Text
              style={{
                marginTop: 4,
                marginBottom: 4,
                marginLeft: 4,
                marginRight: 4,
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#f2f2f2",
                alignSelf: "baseline",
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              {spec}
            </Text>
          ))}
        </View> */}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productList}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              flexDirection: "column",
              margin: 5,
              padding: 5,
              // borderWidth: 2,
              borderRadius: 10,
              minHeight: 250,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}
          >
            <View
              style={{
                backgroundColor: "#E5E4E2",
                borderRadius: 10,
                // margin: 5,
              }}
            >
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.thumbnail }}
              />
            </View>
            <View style={{ marginTop: 4 }}>
              <Text
                style={{ fontSize: 16 }}
                numberOfLines={1}
              >{`₹${item.title}  `}</Text>
              <Text style={{ fontSize: 12 }} numberOfLines={2}>
                {`₹${item.description}  `}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 5,
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.add(item.title);
                }}
              >
                <AntDesign name="pluscircle" size={30} color="black" />
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <AntDesign name="minuscircle" size={30} color="black" />
              </TouchableOpacity> */}
            </View>
          </View>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    //   headerImage={
    //     <Ionicons size={310} name="code-slash" style={styles.headerImage} />
    //   }
    // >
    //   {productList.map((data, index) => {
    //     return (
    //       <TouchableOpacity key={index}>
    //         <Product product={data} />
    //       </TouchableOpacity>
    //     );
    //   })}
    // </ParallaxScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
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
    // paddingTop: 30,
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
    height: 100,
  },
});
